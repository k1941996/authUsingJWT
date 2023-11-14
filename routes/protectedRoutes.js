import express from 'express';
import userProtectedController from '#controllers/user/protected/userProtectedController.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import { validateUpdatePasswordRequest } from '#middlewares/validators/authValidator.js';

const protectedRouter = express.Router();

protectedRouter.patch(
  '/updatePassword',
  validateUpdatePasswordRequest,
  isRequestValidated,
  userProtectedController.updateUserPassword,
);

export default protectedRouter;
