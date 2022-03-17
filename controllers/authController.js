// signup_get signup-post
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'Oops! This email is already registered with';
    return errors;
  }

  //Incorrect email
  if (err.message === 'Incorrect email') {
    errors.email = 'This email is not registered';
  }

  //Incorrect Password
  if (err.message === 'Incorrect Password') {
    errors.password = 'This Password is totally incorrect';
  }

  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'polymathsecret', {
    expiresIn: maxAge,
  });
};

const signup_get = (req, res) => {
  res.render('signup');
};

const login_get = (req, res) => {
  res.render('login');
};

const signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
    });
    const savedUser = await newUser.save();
    const token = createToken(savedUser._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

    res.status(200).json({ savedUser: savedUser._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
  logout_get,
};
