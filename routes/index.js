import express from 'express';
import UserController from '#controllers/userController.js';
import {
  validateLoginRequest,
  validateUpdatePasswordRequest,
  validateSignUpRequest,
} from '#middlewares/validators/authValidator.js';
import isRequestValidated from '#middlewares/validators/commonError.js';
import protectedRouter from './protectedRoutes.js';
import checkUserAuthenticity from '#middlewares/authMiddleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', validateSignUpRequest, isRequestValidated, UserController.signUp);
router.post('/login', validateLoginRequest, isRequestValidated, UserController.login);

router.use('/secure', checkUserAuthenticity, protectedRouter);

export default router;
