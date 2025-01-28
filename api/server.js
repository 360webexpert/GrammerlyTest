const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const grammerRoutes = require('./routes/grammerRoutes');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());



// Routes
app.use("/api/grammer", grammerRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

