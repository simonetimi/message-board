import express from 'express';
import { format } from 'date-fns';

const router = express.Router();

const colors = [
  '#00b159',
  '#d11141',
  '#bf509c',
  '#ffc425',
  '#f37735',
  '#8c311f',
];

export const messages = [
  {
    text: 'Hi Bob!',
    author: 'Danielle Poole',
    added: format('1992-07-03T18:19:27.052Z', 'dd MMMM yyyy, HH:mm'),
  },
  {
    text: 'Well, sir, I don’t wear pants.',
    author: 'Margo Madison',
    added: format('1973-12-31T22:19:27.052Z', 'dd MMMM yyyy, HH:mm'),
  },
];

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', {
    title: 'Mini Message Board',
    messages: messages,
    colors: colors,
  });
});

export default router;
