import UserController from '#controllers/userController.js';
import { validateUpdatePasswordRequest } from '#middlewares/validators/authValidator.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import express from 'express';

const protectedRouter = express.Router();

protectedRouter.post(
  '/updatePassword',
  validateUpdatePasswordRequest,
  isRequestValidated,
  UserController.updateUserPassword,
);

export default protectedRouter;
