const mongoose = require('mongoose');

require('dotenv').config();

const dbURI = process.env.MONGO_URI;

const connect = () => {
  mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const database = mongoose.connection;

  database.on('error', (e) => {
    console.log(e);
  });

  database.once('connected', () => {
    console.log('Database now plugged in.');
  });
};

module.exports = connect;
