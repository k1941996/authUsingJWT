import express from 'express';
import authProtectedRouter from './auth/protectedRoutes.js';

const protectedRouter = express.Router();

protectedRouter.use('/',authProtectedRouter)

export default protectedRouter;
