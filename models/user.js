import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

// Export model
const User = mongoose.model('User', UserSchema);
export default User;
