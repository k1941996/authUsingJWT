import jwt from 'jsonwebtoken';
import userModel from '#models/UserModel.js';

const checkUserAuthenticity = async (request, response, next) => {
  const { authorization } = request.headers;
  const { accountid } = request.headers;
  if (authorization && authorization.startsWith('Bearer') && accountid) {
    try {
      const token = authorization.split(' ')[1];
      const { password_id } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = (await userModel.findById(accountid)).toObject();
      const userId = user._id.toString();
      if (user.password_id === password_id && userId === accountid) {
        request.user = user;
        next();
      } else {
        response.status(401).send({ message: 'Unauthorized', error: 'Invalid User' });
      }
    } catch (error) {
      response.status(401).send({ message: 'Unauthorized', error });
    }
  } else {
    response.status(401).send({
      message: 'Unauthorized',
      error: { message: 'Missing Token or accountID' },
    });
  }
};

export default checkUserAuthenticity;
