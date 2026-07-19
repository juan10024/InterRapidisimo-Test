/*
 * propósito: Definir las rutas de la API.
 * contexto:  Capa de infraestructura, rutas de la API.
 */

import { Router } from 'express';
import { ProductController } from '../controllers/ProductController.js';
import { RewardController } from '../controllers/RewardController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { GetProductsSchema, ExecuteRewardSchema, GetProductByIdSchema } from '../schemas/requestSchemas.js';
import { getHealthStatus } from '../controllers/HealthController.js';

const apiRouter = Router();
const productController = new ProductController();
const rewardController = new RewardController();

// Rutas bajo convención REST estándar
apiRouter.get('/products', validateRequest(GetProductsSchema), productController.getAll);
apiRouter.get('/products/:id', validateRequest(GetProductByIdSchema), productController.getById);
apiRouter.post('/rewards/action', validateRequest(ExecuteRewardSchema), rewardController.handleAction);
apiRouter.get('/health', getHealthStatus);

export { apiRouter };