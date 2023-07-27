import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  userName: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true, select: false },
  email: { type: String, required: true, trim: true },
  termsAndConditions: { type: Boolean, required: true, trim: true },
});

const userModel = mongoose.model('User', userSchema);

export default userModel;
