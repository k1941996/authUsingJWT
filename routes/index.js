import express from 'express';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';
import protectedRouter from './protectedRoutes.js';
import authPublicRouter from './auth/publicRoutes.js';

const router = express.Router();

router.use('/', authPublicRouter);

router.use('/secure', checkUserAuthenticity, protectedRouter);

export default router;
