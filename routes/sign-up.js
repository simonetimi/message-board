import express from 'express';
import bcrypt from 'bcryptjs';
const router = express.Router();

import User from '../models/user.js';

router.get('/', (req, res) =>
  res.render('sign-up', { title: 'Sign-up', app: 'Message Board' })
);
router.post('/', async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashedPassword,
    });
    const result = await user.save();
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
});

export default router;
