const express = require('express');
const app = express();
const cors = require('cors');
const ProductRoute = require('./routes/ProductRoute');

app.use(express.json());
app.use(cors({
  origin: ['https://shopy-teal.vercel.app', 'http://localhost:5173'], // Remove trailing slash
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

app.use('/', ProductRoute);

app.get('/', (req, res) => {
  res.send('✅ Server is up and running!');
});

// Export the Express app for Vercel (no app.listen() needed)
module.exports = app;