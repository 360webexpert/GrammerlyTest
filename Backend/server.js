const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const grammerRoutes = require('./routes/grammerRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose
    .connect('mongodb://localhost:27017/grammer', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/grammer", grammerRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

