// signup_get signup-post

// handle Errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = 'Oops! This email is already registered with';
    return errors;
  }

  //validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const User = require('../models/User');

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
    res.status(200).json(savedUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  res.send('user login');
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
