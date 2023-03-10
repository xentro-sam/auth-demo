const express = require('express');
const app = express();
const AuthRoutes = require('./src/routers/auth.routes');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,PUT,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(AuthRoutes);

app.listen(PORT, () => {
  console.log(`Auth Server is running on port ${PORT}`);
});
