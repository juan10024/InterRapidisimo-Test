# API backend

## Índice

1. [Configuración](#configuración)
2. [Formato de respuestas](#formato-de-respuestas)
3. [Endpoints](#endpoints)
   1. [Estado del servicio](#estado-del-servicio)
   2. [Productos](#productos)
   3. [Producto por ID](#producto-por-id)
   4. [Perfil del usuario actual](#perfil-del-usuario-actual)
   5. [Acción de recompensa](#acción-de-recompensa)

## Configuración

La URL base por defecto en desarrollo es `http://localhost:3000/api/v1`.

El frontend usa `VITE_API_BASE_URL` para configurarla:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Las variables `VITE_*` se incluyen en el navegador. No deben contener contraseñas, tokens ni otros secretos.

Para el modo demo, el backend acepta `DEMO_USER_ID`, un UUID que identifica el usuario que devuelve `GET /users/current`. Si se omite, usa el UUID demo documentado en `backend/.env.example`. El seed usa el mismo valor, por lo que debe existir antes de consultar el perfil.

## Formato de respuestas

Las respuestas satisfactorias usan esta estructura:

```json
{
  "status": "success",
  "message": "Descripción del resultado",
  "data": {}
}
```

Los errores de cliente usan `status: "fail"`; los errores internos usan `status: "error"`. Ambos incluyen `message` y los errores de validación además incluyen `errors`.

## Endpoints

### Estado del servicio

`GET /health`

Comprueba la disponibilidad del backend y de sus dependencias. No requiere parámetros.

```bash
curl http://localhost:3000/api/v1/health
```

### Productos

`GET /products`

Devuelve productos paginados. Los parámetros opcionales son `page` (predeterminado `1`), `limit` (predeterminado `10`), `category` y `search`.

```bash
curl "http://localhost:3000/api/v1/products?page=1&limit=4&category=perifericos&search=teclado"
```

La respuesta contiene `data.products` y `data.meta` con el total, página, límite y total de páginas.

### Producto por ID

`GET /products/:id`

Obtiene un producto usando un UUID válido.

```bash
curl http://localhost:3000/api/v1/products/PRODUCT_UUID
```

La respuesta contiene el producto en `data.product`. Devuelve `404` si no existe.

### Perfil del usuario actual

`GET /users/current`

Devuelve el perfil público del usuario demo configurado, sin requerir que el frontend conozca su ID.

```bash
curl http://localhost:3000/api/v1/users/current
```

Ejemplo de respuesta:

```json
{
  "status": "success",
  "message": "Perfil de usuario obtenido correctamente.",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "pointsBalance": 65
    }
  }
}
```

Devuelve `404` si `DEMO_USER_ID` no corresponde a un usuario existente. Este endpoint es exclusivo del escenario demo actual; una solución multiusuario deberá reemplazarlo por un perfil vinculado a autenticación.

### Acción de recompensa

`POST /rewards/action`

Registra una acción elegible y actualiza el balance del usuario. El servidor decide los puntos otorgados.

```bash
curl -X POST http://localhost:3000/api/v1/rewards/action \
  -H "Content-Type: application/json" \
  -d '{"userId":"USER_UUID","productId":"PRODUCT_UUID","actionType":"ADD_TO_CART"}'
```

El cuerpo requiere UUIDs `userId` y `productId`, y `actionType` debe ser uno de `ADD_TO_CART`, `FAVORITE` o `PURCHASE`. La respuesta devuelve `actionType`, `pointsAwarded` y `newPointsBalance` en `data`.
