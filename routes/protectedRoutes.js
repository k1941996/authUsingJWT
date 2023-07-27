import express from 'express';
import UserController from '#controllers/userController.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import { validateUpdatePasswordRequest } from '#middlewares/validators/authValidator.js';

const protectedRouter = express.Router();

protectedRouter.post(
  '/updatePassword',
  validateUpdatePasswordRequest,
  isRequestValidated,
  UserController.updateUserPassword,
);

export default protectedRouter;
