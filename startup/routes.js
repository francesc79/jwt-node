const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
const books = require('../routes/books');
const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.static('public'));
  app.use('/api/books', books);
  app.use('/api/auth', auth);
  app.use('*', (rqt, res) => {
    res.status(404).send('resource not found');
  });
  app.use(error);
}