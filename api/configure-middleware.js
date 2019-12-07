//  This combines all of our middleware into one location
//  Does a Use with all of the third party methods we want

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors());
};
