const routes = require('express').Router();
const quotes = require('./quotes');
const login = require('./login')

routes.use('/quotes', quotes);
routes.use('/login', login);

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

// module.exports = routes;
export = routes;