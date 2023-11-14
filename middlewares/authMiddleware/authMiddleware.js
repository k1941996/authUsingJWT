import jwt from 'jsonwebtoken';
import userModel from '#models/UserModel.js';

const checkUserAuthenticity = async (request, response, next) => {
  const { authorization } = request.headers;
  const { userName } = request.body;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      const token = authorization.split(' ')[1];
      const { userId, password_id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = (await userModel.findById(userId)).toObject();
      if (user.userName === userName && user.password_id === password_id) {
        request.user = user;
        next();
      } else {
        response.status(401).send({ message: 'Unauthorized', error: 'Invalid User' });
      }
    } catch (error) {
      response.status(401).send({ message: 'Unauthorized', error });
    }
  } else {
    response
      .status(401)
      .send({ message: 'Unauthorized', error: { message: 'Missing Token' } });
  }
};

export default checkUserAuthenticity;
