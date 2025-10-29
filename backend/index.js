require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database.js');
const employeeRoutes = require('./routes/employeeroute.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // to read JSON body

connectDB();

app.use('/api/employees', employeeRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Employee Management API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
