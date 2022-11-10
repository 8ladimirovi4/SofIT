/* eslint-disable */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: ['http://localhost:3000'] }));

//routes
app.use('/upload', express.static('./uploads'));

app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
