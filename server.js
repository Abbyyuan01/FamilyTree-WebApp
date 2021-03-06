var express = require('express');
var cors = require('cors');
var app = express();
const mongoose = require('mongoose');
const path = require('path');
const config = require('config')
const db = config.get('db')
const morgan = require("morgan");

// middleware use
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//connect to mongoab
const uri = process.env.MONGODB_URI || db;
// const uri = "mongodb://localhost:27017/familytree"

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
const userRouter = require('./routes/user.route')

app.use('/', artifactRouter);
app.use('/', userRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static( 'client/build' ));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); // relative path
    });
}

const port = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test"){
    app.listen(port, () => {
        console.log(`Server running is runnig on port: ${port}`)
    });
}

// app.use((req, res, next) => {
//     const error = new Error("Not found");
//     error.status = 404;
//     next(error);
// });
  
// app.use((error, req, res, next) => {
//     res.status(error.status || 500);
//     res.json({
//       error: {
//         message: error.message
//       }
//     });
// });

module.exports = app