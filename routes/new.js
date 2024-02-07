import express from 'express';
import { format } from 'date-fns';

// this import is the array with messages. it must be replaced with a database
// import { messages } from './index.js';

import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';

import Message from '../models/message.js';
import User from '../models/user.js';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('form', { title: 'Leave a message', app: 'Mini Message Board' });
});

router.post('/', function (req, res) {
  const author = req.body.author;
  const message = req.body.message;
  const date = format(new Date(), 'dd MMMM yyyy, HH:mm');
  /* write database instead
  messages.push({
    text: message,
    author: author,
    added: date,
  });
  */
  res.redirect('/');
});

export default router;
