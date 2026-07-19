/*
 * propósito: Insertar un usuario y productos de prueba para desarrollo
 * contexto:  Ejecutar con el comando "npm run seed" y se conecta a la base de datos
 */

import "reflect-metadata";
import { AppDataSource } from '../data-source.js';
import { UserSchema } from '../orm-models/UserSchema.js';
import { ProductSchema } from '../orm-models/ProductSchema.js';
import { randomUUID } from 'crypto';

// UUID Fijo para desarrollo
export const TEST_USER_ID = "550e8400-e29b-41d4-a716-446655440000";

async function runSeed() {
  console.log('🌱 Iniciando el proceso de Seeding...');
  
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userRepo = AppDataSource.getRepository(UserSchema);
  const productRepo = AppDataSource.getRepository(ProductSchema);

  // Poblar Usuario de Prueba
  const userExists = await userRepo.findOneBy({ id: TEST_USER_ID });
  if (!userExists) {
    const testUser = userRepo.create({
      id: TEST_USER_ID,
      email: "senior.developer@tienda.com",
      pointsBalance: 0,
    });
    await userRepo.save(testUser);
    console.log(`Usuario de prueba creado con ID: ${TEST_USER_ID}`);
  }

  // Poblar Catálogo de Productos Mínimo
  const productCount = await productRepo.count();
  if (productCount === 0) {
    const initialProducts = [
      {
        id: randomUUID(),
        name: "Teclado Mecánico RGB Custom",
        price: 129.99,
        category: "perifericos",
        imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
        stock: 15,
      },
      {
        id: randomUUID(),
        name: "Ratón Ergonómico Inalámbrico",
        price: 79.50,
        category: "perifericos",
        imageUrl: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500",
        stock: 25,
      },
      {
        id: randomUUID(),
        name: "Monitor Gamer 27' 144Hz",
        price: 349.99,
        category: "pantallas",
        imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
        stock: 8,
      },
      {
        id: randomUUID(),
        name: "Silla Ergonómica Pro",
        price: 240.00,
        category: "muebles",
        imageUrl: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=500",
        stock: 5,
      }
    ];

    await productRepo.save(productRepo.create(initialProducts));
    console.log('Catálogo inicial de productos insertado con éxito.');
  }

  console.log('Seeding finalizado con éxito.');
  process.exit(0);
}

runSeed().catch((error) => {
  console.error('Error fatal durante el Seeding:', error);
  process.exit(1);
});