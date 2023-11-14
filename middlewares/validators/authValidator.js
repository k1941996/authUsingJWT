import { check } from 'express-validator';

const validateLoginRequest = [
  check('userName').notEmpty().withMessage('Username is required field').bail(),
  check('password').notEmpty().withMessage('Password is required field').bail(),
];
const validateForgotPasswordRequest = [
  check('email')
    .notEmpty()
    .withMessage('Email is required field')
    .bail()
    .isEmail()
    .bail()
    .withMessage('Enter a Valid email address')
    .bail(),
];

const validateSignUpRequest = [
  check('name').notEmpty().withMessage('Name is required field'),
  check('userName')
    .notEmpty()
    .withMessage('Username is required field')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username should have more than 3 characters')
    .bail(),
  check('password')
    .notEmpty()
    .bail()
    .withMessage('Password is required field')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .bail()
    // .matches(/^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/)
    // .withMessage('Password should contains numbers and letters')
    .custom(async (password, { req }) => {
      const confirm_password = req.body.confirm_password;
      if (password !== confirm_password) {
        throw new Error('Passowrd and Confirm Password do not match');
      }
    })
    .bail(),
  check('email')
    .notEmpty()
    .withMessage('Email is required field')
    .bail()
    .isEmail()
    .withMessage('Enter a Valid email address')
    .bail()
    .custom(async (email, { req }) => {
      const userName = req.body.userName;
      if (email === userName) {
        throw new Error('Email and username should not be same');
      }
    })
    .bail(),
  check('termsAndConditions')
    .isBoolean()
    .withMessage('terms and conditions value must be checked'),
];

const validateUpdatePasswordRequest = [
  check('old_password').notEmpty().withMessage('Old passwod is required').bail(),
  check('password')
    .notEmpty()
    .bail()
    .withMessage('Password is required field')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password should be at least 6 characters')
    .bail()
    .custom(async (password, { req }) => {
      const confirm_password = req.body.confirm_password;
      if (password !== confirm_password) {
        throw new Error('Passowrd and Confirm Password do not match');
      }
    })
    .bail(),
];

const validateResetPasswordRequest = [
  check('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password should at least be of min length 6')
    .bail()
    .custom(async (_, { req }) => {
      const { password, confirm_password } = req.body;
      if (password !== confirm_password) {
        throw new Error('Passowrd and Confirm password does not match');
      }
    }),
];

export {
  validateLoginRequest,
  validateUpdatePasswordRequest,
  validateResetPasswordRequest,
  validateSignUpRequest,
  validateForgotPasswordRequest,
};
