import express from 'express';
import authProtectedRouter from './auth/protectedRoutes.js';

const protectedRouter = express.Router();

protectedRouter.use('/', authProtectedRouter);

protectedRouter.post('/test', (request, response) => {
  response.status(200).send('ok');
});

export default protectedRouter;
