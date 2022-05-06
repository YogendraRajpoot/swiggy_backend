const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const { SERVER_PORT } = require('../constants/constants');

// Application configurations
const PORT = SERVER_PORT;
app.use(cors());
app.use(express.json());

// Routes
app.use('/', require('../routes/router'));

// Database config
const db = mongoose;

module.exports = {
  app,
  db,
  PORT,
};
