import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
export const generatePassowrdId = () => {
  const password_id = uuid();
  return password_id;
};

export const generateToken = (user) => {
  const token = jwt.sign({ password_id: user.password_id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
  return token;
};
