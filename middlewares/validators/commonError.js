import { validationResult } from 'express-validator';

const isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.errors.length) {
    return res.status(400).json({ errors: errors.errors });
  }
  next();
};

export default isRequestValidated;
