import express from 'express';
import { format } from 'date-fns';
import { messages } from './index.js';
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('form', { title: 'Leave a message', app: 'Mini Message Board' });
});

router.post('/', function (req, res) {
  const author = req.body.author;
  const message = req.body.message;
  const date = format(new Date(), 'dd MMMM yyyy, HH:mm');
  messages.push({
    text: message,
    author: author,
    added: date,
  });
  res.redirect('/');
});

export default router;
