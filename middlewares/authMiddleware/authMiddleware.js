import jwt from 'jsonwebtoken';
import userModel from '#models/UserModel.js';

const checkUserAuthenticity = async (request, response, next) => {
  try {
    const { authorization, username } = request.headers;
    if (authorization && authorization.startsWith('Bearer')) {
      const token = authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await userModel.findById(userId);
      if (user.userName === username) {
        request.user = user;
        return next();
      } else {
        response.status(403).send('Unauthorized');
      }
    } else {
      response.status(403).send('Unauthorized');
    }
  } catch (error) {
    console.log(error);
    response.status(400).send('Something went wrong');
  }
};

export default checkUserAuthenticity;
