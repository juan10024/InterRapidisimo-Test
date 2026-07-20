<h1 align="center">Ejercicio de criterio técnico - Refactor y diagnóstico</h1>

<br>
<br>

---

# Tabla de Contenidos

- [Análisis de código por imágenes](#análisis-de-código-por-imágenes)
- [Problemas detectados priorizados por impacto](#problemas-detectados-priorizados-por-impacto)
- [Código refactorizado](#código-refactorizado)
- [Qué queda afuera y por qué?](#qué-queda-afuera-y-por-qué)

---

## Análisis del Código por Imágenes

> En la ruta [ejercicio_2/analysis](ejercicio_2/analysis) se encuentra el análisis descriptivo por imágenes del código a refactorizar.
> 

---

## Problemas detectados priorizados por impacto

- *[Grave]* **Ciclo infinito de renderizado**: El llamado a la API fetch se ejecuta directamente en el cuerpo del componente en cada ciclo de render. Al resolver la promesa, actualiza el estado, lo que desencadena un nuevo render, creando un bucle infinito. 
- *[Grave]* **Manejo de lógica de negocio por el cliente**: La función addToCart calcula y asigna los puntos de recompensa enviando el valor final al backend. Esto viola el principio de que el cliente no debe tener la capacidad de manipular puntos; el backend debe ser la única fuente de verdad para estas reglas. 
- *[Alto]* **Pérdida de datos por mutación destructiva**: La función handleSearch sobrescribe el estado products con el resultado del filtrado. Al borrar el input de búsqueda, el catálogo completo es irrecuperable sin volver a consultar la API. Complejidad espacio-temporal O(n). 
- *[Alto]* **Mutación directa del estado**: En addToCart, antri-patrón de React, se utiliza cart.push(product). En React, el estado debe ser inmutable; modificarlo directamente previene que el componente detecte el cambio y se re-renderice correctamente.  
- *[No es Grave]* **Variables globales y sintaxis anticuada**: Uso de la variable global cachedProducts, no se están siguiendo las convenciones del lenguaje.

---

## Código Refactorizado

```javascript
import React, { useState, useEffect } from "react";

function ProductCatalog(props) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [points, setPoints] = useState(0);

  // Evitar ciclos infinitos envolviendo el fetch en un useEffect.
  useEffect(() => {
    fetch("https://api.tienda.com/products?category=" + props.category)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [props.category]);

  // Controlar únicamente el texto de búsqueda en el estado.
  function handleSearch(e) {
    setSearch(e.target.value);
  }

  // Derivar el estado de los productos filtrados en lugar de mutar el array original.
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  function addToCart(product) {
    // Actualización inmutable del estado del carrito.
    setCart((prevCart) => [...prevCart, product]);

    // El cliente informa la acción, el backend evalúa las reglas y retorna los nuevos puntos.
    fetch("https://api.tienda.com/users/1/actions/add_to_cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // Se asume que el backend responde con { newPoints: X } si la acción otorgó puntos.
        if (data.newPoints !== undefined) {
          setPoints(data.newPoints);
        }
      })
      .catch((err) => console.error("Error registering action:", err));
  }

  return (
    <div>
      <input value={search} onChange={handleSearch} placeholder="Buscar producto..." />
      <p>Puntos: {points}</p>
      {filteredProducts.map((p, index) => (
        // Agregar un key 
        <div key={p.id || index} onClick={() => addToCart(p)}>
          <img src={p.image} alt={p.name} />
          <span>{p.name}</span>
          <span>${p.price}</span>
        </div>
      ))}
      <div>Items en carrito: {cart.length}</div>
    </div>
  );
}

export default ProductCatalog;
```

---

## Qué queda afuera y por qué?

> Debido a la restricción de tiempo y priorizando solucionar problemas con mayor impacto directo en rendimiento sobre la funcionalidad, las siguientes mejoras técnicas y de diseño se dejan afuera:

- **Capa de Servicios y Abstracción**: Mover las llamadas a fetch a un archivo de servicios, ej: productService.js. Dejar las URLs directamente en el componente no es adecuado, usar variables de entorno.
- **Manejo explícito de estados de carga y error (UI)**: Actualmente, si la red falla, el usuario solo ve una pantalla en blanco. Se requiere implementar estados como isLoading y isError para dar feedback visual al usuario mientras la petición se resuelve.
- **Debounce en la búsqueda**: Implementar un debounce en el input de búsqueda. Aunque ahora el filtrado es local, si a futuro se delega al servidor, enviar un evento por cada tecla presionada puede saturar la red.
- **Accesibilidad y Estilos**: Reemplazar los div con eventos onClick por etiquetas semánticas `<button>` para permitir la navegación por teclado y asegurar soporte para lectores de pantalla.