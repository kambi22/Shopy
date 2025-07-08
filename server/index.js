const express = require('express');
const app = express();
const cors = require('cors');
const PrductesRoute = require('./routes/PrductesRoute')

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
}));

// Mount the route at /api/products
app.use('/', PrductesRoute);

// Default route
app.get('/', (req, res) => {
  res.send('✅ Server is up and running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
