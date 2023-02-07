const express = require('express');
const app = express();
const  AuthRoutes = require('./src/routers/auth.routes');
const PORT = 4000

app.use(express.json());

app.use(AuthRoutes);

app.listen(PORT, () => {
    console.log(`Auth Server is running on port ${PORT}`);
});