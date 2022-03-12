const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI =
  'mongodb+srv://Ayoluwa:%40Faithie123@cluster0.nm9b8.mongodb.net/node_jwt_auth?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => console.log('Now connected to our Database...'))
  .catch((err) => console.log(err));

// const database = mongoose.connection();

// database.on('error', () => {
//   console.log('Oops! There has been an error...');
// });

// database.once('connected', () => {
//   console.log('We are now connected!');
// });

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

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

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
