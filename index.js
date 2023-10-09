const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

require('./config/database').connect();

// routes and mounting
const user = require('./routes/user');
app.use('/api/v1', user);


// server activate
app.listen(PORT, () => {
    console.log(`Server Started Successfully at ${PORT}`);
})
