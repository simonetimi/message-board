import express from 'express';
import { format } from 'date-fns';

import asyncHandler from 'express-async-handler';

import Message from '../models/message.js';

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  if (!req.user) {
    return res.render('login', { title: 'Login', app: 'Message Board' });
  }
  res.render('form', { title: 'Leave a message', app: 'Message Board' });
});

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const text = req.body.text;
    const userId = req.user._id;
    const date = format(new Date(), 'dd MMMM yyyy, HH:mm');
    const message = new Message({
      text: text,
      user: userId,
      added: date,
    });
    const result = await message.save();
    res.redirect('/');
  })
);

export default router;
