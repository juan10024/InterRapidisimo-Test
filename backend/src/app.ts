/*
 * propósito: Punto de entrada de la aplicación.
 * contexto:  Capa de infraestructura, punto de entrada de la aplicación.
 */

import "reflect-metadata"; 
import express from 'express';
import { env } from './infrastructure/config/env.js';
import { AppDataSource } from './infrastructure/database/data-source.js';
import { apiRouter } from './infrastructure/web/routes/apiRoutes.js';
import { errorHandler } from './infrastructure/web/middlewares/errorHandler.js';

const app = express();

app.use(express.json());

// Habilitar CORS para permitir peticiones desde el frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Accept");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Prefijo de API global y escalable
app.use('/api/v1', apiRouter);

// El manejador de errores siempre debe ir al final de las rutas
app.use(errorHandler);

// Inicializar la conexión a la base de datos antes de escuchar el puerto
AppDataSource.initialize()
  .then(() => {
    console.log('Base de datos PostgreSQL conectada mediante TypeORM');
    
    app.listen(env.PORT, () => {
      console.log(`Servidor backend corriendo en http://localhost:${env.PORT} en modo [${env.NODE_ENV}]`);
    });
  })
  .catch((error) => {
    console.error('Error fatal al inicializar el Data Source de la base de datos:', error);
    process.exit(1);
  });