import express from 'express';
import { format } from 'date-fns';
import Message from '../models/message.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

const colors = [
  '#00b159',
  '#d11141',
  '#bf509c',
  '#ffc425',
  '#f37735',
  '#8c311f',
];

/* GET home page. */
router.get(
  '/',
  asyncHandler(async (req, res, next) => {
    let allMessages = await Message.find()
      .sort({ added: 1 })
      .populate('user')
      .exec();
    // format dates
    allMessages = allMessages.map((message) => {
      const formattedDate = format(
        new Date(message.added),
        'dd MMMM yyyy, HH:mm'
      );
      return { ...message.toObject(), added: formattedDate };
    });

    res.render('index', {
      user: req.user,
      title: 'Message Board',
      messages: allMessages,
      colors: colors,
    });
  })
);

router.post('/delete-message', async (req, res) => {
  const { id } = req.body;
  if (req.body._method === 'DELETE') {
    try {
      const deletedMessage = await Message.findByIdAndDelete(id);
      if (!deletedMessage) {
        return res.status(404).send('Message not found');
      }
      res.redirect('/');
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
});

export default router;
