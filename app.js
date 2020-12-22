const express = require('express');
const session = require('express-session');
const path = require('path');

const cookieParser = require('cookie-parser');

const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
// const indexRouter = require('./routes/index');
// const entriesRouter = require('./routes/entries');
// const usersRouter = require('./routes/users');



const app = express();

// Подключаем mongoose.

mongoose.connect('mongodb://localhost:27017/doctorbest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
app.use(session({
  secret: 'hlihlvgukcfiyk44kuvg',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore({
    mongooseConnection: mongoose.createConnection('mongodb://localhost:27017/doctorbest', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }),
  }),
}));
app.use((req, res, next) => {
  res.locals.userId = req.session?.userId;
  next();
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));



// app.use('/', indexRouter);
// app.use('/entries', entriesRouter);
// app.use('/users', usersRouter);





app.listen(3000);
module.exports = app;
