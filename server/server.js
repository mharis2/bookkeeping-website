const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // Import routes

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use('/', routes);

// start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
