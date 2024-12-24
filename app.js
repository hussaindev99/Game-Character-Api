const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://abdullah:12345ab@abdullah.igvz11s.mongodb.net/?retryWrites=true&w=majority&appName=abdullah', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('error', error => {
    console.log('connection fail', error);
});
mongoose.connection.on('connected', () => {
    console.log('connection successful');
});

// Ensure the /tmp directory is used for temporary files


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const User = require('./api/route/users');

app.use('/user', User);

app.use((req, res, next) => {
    res.status(404).json({
        msg: "not found"
    });
});

module.exports = app;
