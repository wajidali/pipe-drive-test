// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');

const mongoClient = require('./server/database/db');
const api = require('./server/api');

var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./server/swagger.json');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));



// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '8080';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, '0.0.0.0', () => console.log(`API running on localhost:${port}`));