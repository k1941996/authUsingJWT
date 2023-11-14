import User from '#models/UserModel.js';
import bcrypt from 'bcrypt';
import { generatePassowrdId, generateToken } from '#utils/authUtils.js';

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



const UserPublicController = { signUp, login };
export default UserPublicController;
