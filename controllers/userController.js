import User from '#models/UserModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const signUp = async (request, response) => {
  const { name, userName, termsAndConditions, email, password } = request.body;
  const user = await User.findOne({
    $or: [{ userName }, { email: userName }, { email: email }],
  });
  if (user) {
    response.status(409).json({ message: 'Email or username already taken' });
  } else {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      userName,
      email,
      password: hashedPassword,
      termsAndConditions,
    });
    newUser
      .save()
      .then((saved_user) => {
        const token = jwt.sign({ userId: saved_user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1d',
        });
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
    })
      .select('+password')
      .lean();

    const isPassowrdCorrect = user && (await bcrypt.compare(password, user?.password));
    if (user && isPassowrdCorrect) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
      });

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
  const { password, confirm_password } = request.body;
  const user = request.user;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);
  response.status(200).send({ hashedPassword });
};

const UserController = { signUp, login, updateUserPassword };
export default UserController;
