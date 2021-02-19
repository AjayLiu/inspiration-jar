const routes = require('express').Router();
const quotes = require('./quotes');

routes.use('/quotes', quotes);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;