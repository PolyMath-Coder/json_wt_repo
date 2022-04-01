const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
require('dotenv').config();

const port = process.env.PORT;

const connect = require('./helpers/mongoose');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection

// const database = mongoose.connection();

// database.on('error', (e) => {
//   console.log('Oops! There has been an error...');
// });

// database.once('connected', () => {
//   console.log('We are now connected!');
// });

// routes
app.get('*', checkUser);
app.get('/', requireAuth, (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));

app.use(authRoutes);

// app.get('/set-cookies', (req, res) => {
//   // res.setHeader('Set-Cookie', 'newUser=true');
//   res.cookie('newUser', false);
//   res.cookie('isEmployee', true, {
//     maxAge: 1000 * 60 * 60 * 24,
//     httpOnly: true,
//   });
//   res.send('You got the cookies!');
// });

// app.get('/read-cookies', (req, res) => {
//   const cookies = req.cookies;
//   console.log(cookies.newUser);

//   res.json(cookies);
// });

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});

connect();
