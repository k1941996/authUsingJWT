import User from '#models/UserModel.js';
// import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { generatePassowrdId, generateToken } from '#routes/utils/authUtils.js';

const signUp = async (request, response) => {
  const { name, userName, termsAndConditions, email, password } = request.body;
  const user = await User.findOne({
    $or: [{ userName }, { email: userName }, { email: email }],
  });
  if (user) {
    return response.status(409).json({ message: 'Email or username already taken' });
  } else {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const password_id = generatePassowrdId();
    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      termsAndConditions,
      password_id,
    });
    newUser
      .save()
      .then((saved_user) => {
        saved_user = saved_user.toObject();
        delete saved_user.password;
        const token = generateToken({ ...saved_user, password_id });

        response
          .status(201)
          .send({ message: 'User created successfully', data: saved_user, token });
      })
      .catch((err) => {
        console.log(err);
        response.status(500).send({ err });
      });
  }
};

const login = async (request, response) => {
  try {
    const { userName, password } = request.body;
    let user = await User.findOne({
      $or: [{ userName }, { email: userName }],
    }).lean();

    const isPassowrdCorrect = user && (await bcrypt.compare(password, user?.password));
    if (user && isPassowrdCorrect) {
      const password_id = user.password_id;
      const token = generateToken({ ...user, password_id });

      delete user.password;

      response.status(200).send({ data: user, token });
    } else {
      response.status(404).send({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateUserPassword = async (request, response) => {
  const { password, old_password } = request.body;
  const user = request.user;
  const isPassowrdCorrect = user && (await bcrypt.compare(old_password, user?.password));
  if (isPassowrdCorrect) {
    const password_id = generatePassowrdId();
    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      {
        $set: { password: hashedPassword, password_id },
      },
      { new: true },
    ).lean();

    const token = generateToken({ ...updatedUser, password_id });
    delete updatedUser.password;

    return response.status(200).send({
      message: 'Password modified Successfully',
      user: { ...updatedUser },
      token: token,
    });
  } else {
    return response.status(401).send({
      message: 'Incorrect password',
    });
  }
};

const UserController = { signUp, login, updateUserPassword };
export default UserController;
