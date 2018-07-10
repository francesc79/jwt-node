const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const books = require('../routes/books');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(helmet());
  app.use(compression());
  app.use('/api/books', books);
  app.use('/api/auth', auth);
  app.use(error);
}