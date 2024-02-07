import express from 'express';
const router = express.Router();

import User from '../models/user.js';

router.get('/', (req, res) =>
  res.render('sign-up', { title: 'Sign-up', app: 'Mini Message Board' })
);
router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect('/');
  } catch (err) {
    return next(err);
  }
});

export default router;
