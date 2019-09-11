var express = require('express');
var cors = require('cors');
var app = express();
const multer = require('multer');
const mongoose = require('mongoose');

// midware use
app.use(cors());
app.use(express.json());

// set view engine

//connect to mongoab
//const uri = "mongodb+srv://ghostzen:ghostzen111@cluster0-tvhfs.gcp.mongodb.net/familytree?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/familytree"

const options = {
    useNewUrlParser: true
};

mongoose.connect(uri, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

//Routes Setup
const artifactRouter = require('./routes/artifact.route');

app.use('/', artifactRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running is runnig on port: ${port}`)
});