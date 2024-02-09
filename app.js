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
import loginRouter from './routes/login.js';
import logoutRouter from './routes/logout.js';

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
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(
  session({ secret: 'fakecats', resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/', indexRouter);
app.use('/new', newRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

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

// passport auth
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email', // Specify that the "username" field is actually "email"
    },
    async (email, password, done) => {
      // Mark the function as async
      try {
        // Use await to wait for the promise to resolve
        const user = await User.findOne({ email: email });

        if (!user) {
          // If no user is found, return with a message
          return done(null, false, { message: 'Incorrect email.' });
        }

        // Use bcrypt to compare the hashed password
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          // If the password does not match, return with a message
          return done(null, false, { message: 'Incorrect password.' });
        }

        // If everything passes, return the user object
        return done(null, user);
      } catch (error) {
        // In case of any error during the process, return it
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default app;
