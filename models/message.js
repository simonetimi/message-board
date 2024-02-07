import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  text: { type: String, required: true },
  // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  user: { type: String, required: true },
  added: { type: Date, required: true },
});

// Export model
const Message = mongoose.model('Message', MessageSchema);
export default Message;
