import User from '#models/UserModel.js';
import bcrypt from 'bcrypt';
import { generatePassowrdId, generateToken } from '#utils/authUtils.js';

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

const UserProtectedController = { updateUserPassword };

export default UserProtectedController;
