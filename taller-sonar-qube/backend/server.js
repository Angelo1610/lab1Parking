require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const zonesRoutes = require('./routes/zones');
const spacesRoutes = require('./routes/spaces');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Routes
app.use('/zones', zonesRoutes);
app.use('/spaces', spacesRoutes);

app.use((err, req, res, next) => {
  logger.error('Server error:', err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

let server;
if (process.env.NODE_ENV !== 'test') {
  server = app.listen(port, () => {
    logger.info(`Server running on port ${port}`);
  });
}

module.exports = app;