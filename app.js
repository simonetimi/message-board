import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';

import User from './models/user.js';

import indexRouter from './routes/index.js';
import newRouter from './routes/new.js';
import signupRouter from './routes/sign-up.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/sign-up', signupRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// connect to database
import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
const mongoDB = process.env.MONGODB_URI;

async function main() {
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

main().catch((err) => console.log(err));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// passport auth
passport.use(
  new LocalStrategy(function (email, password, done) {
    User.findOne({ email: email }, function (err, email) {
      if (err) {
        return done(err);
      }
      if (!email) {
        return done(null, false, { message: 'Incorrect email' });
      }
      if (!email.verifyPassword(password)) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, email);
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await user.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default app;
