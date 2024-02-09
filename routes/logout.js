import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

export default router;
