const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const mongoDB = process.env.mongoDB;
const main = async () => {
  console.log('Connection initiated!');
  await mongoose.connect(mongoDB);
  console.log('Connection established!');
}
main().catch(err => console.error(err));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const alertsRouter = require('./routes/alerts');
const authenticationRouter = require('./routes/authentication');
const monitoredDestination = require('./routes/monitored_destination');
const profile = require('./routes/profile');

app.use('/alerts', alertsRouter);
app.use('/auth', authenticationRouter);
app.use('/monitor', monitoredDestination);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;