import express from 'express';
import { format } from 'date-fns';

const router = express.Router();

export const messages = [
  {
    text: 'Hi Bob!',
    author: 'Martin',
    added: format(new Date(), 'dd MMMM yyyy, HH:mm'),
  },
  {
    text: 'Ciao vita!',
    author: 'Costanza',
    added: format(new Date(), 'dd MMMM yyyy, HH:mm'),
  },
];

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Mini Message Board', messages: messages });
});

export default router;
