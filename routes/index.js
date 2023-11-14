import express from 'express';
import userPublicController from '#controllers/user/public/userPublicController.js';
import {
  validateLoginRequest,
  validateSignUpRequest,
} from '#middlewares/validators/authValidator.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import protectedRouter from './protectedRoutes.js';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/signup',
  validateSignUpRequest,
  isRequestValidated,
  userPublicController.signUp,
);
router.post(
  '/login',
  validateLoginRequest,
  isRequestValidated,
  userPublicController.login,
);

router.use('/secure', checkUserAuthenticity, protectedRouter);

export default router;
