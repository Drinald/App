const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');

const PORT = process.env.PORT || 5000;

// Init application
const app = express();
app.use(cors());

//MongoDB key taken from the keys.js file
const db = config.get('mongodbURI');

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(console.log('Database connected!'))
    .catch(err => console.log(`Error : ${err}`))

//Bodyparser middleware is integrated in the express, gives us the chance to read the body of the json file
app.use(express.json());

//Use Routes
app.use('/api/items', require('./routes/api/items'));
app.use('/api/user', require('./routes/api/user'));

//Running the server
app.listen(PORT, () => { console.log(`Server running in port ${PORT}`) });