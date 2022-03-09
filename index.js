const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.static('public'));

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

// database.on('connected', () => {
//   console.log('Now Connected...');
// });

// database.once('error', () => {
//   console.log('There has been an error!');
// });

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
