var express = require('express');
var cors = require('cors');
var app = express();
var bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');

// midware use
app.use(cors());
app.use(express.json());

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// set view engine


//connect to mongoab
const uri = "mongodb+srv://ghostzen:ghostzen111@cluster0-tvhfs.gcp.mongodb.net/familytree?retryWrites=true&w=majority";

const options = {
    useNewUrlParser: true,
    dbName: "ghostzen"
};
//const uri = "mongodb://localhost:27017/familytree"
mongoose.connect(uri, options).then(
    () => {
        console.log("Database connection established!");
    },
    err => {
        console.log("Error connecting Database instance due to: ", err);
    }
);

require('./model/artifacts.js');
//Routes Setup
var artifactRoute = require('./routes/artifactRoute.js');

app.use('/',artifactRoute);

const port = process.env.PORT||5000;
app.listen(port, () => {
    console.log(`Server running is runnig on port: ${port}`)
});