import express from 'express';

import userProtectedController from '#controllers/user/protected/userProtectedController.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import { validateUpdatePasswordRequest } from '#middlewares/validators/authValidator.js';
const authProtectedRouter = express.Router();

authProtectedRouter.patch(
  '/updatePassword',
  validateUpdatePasswordRequest,
  isRequestValidated,
  userProtectedController.updateUserPassword,
);

export default authProtectedRouter;
