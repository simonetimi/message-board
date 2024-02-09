import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  added: { type: String, required: true },
});

// Export model
const Message = mongoose.model('Messages', MessageSchema);
export default Message;
