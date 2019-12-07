const express = require('express');

const apiRouter = require('./api-router.js');
const configureMiddleware = require('./configure-middleware.js');

const server = express();

// Make sure config middlware method is at the top so our MW is added
// to the chain
configureMiddleware(server);

server.use('/api', apiRouter);

module.exports = server;
