const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// midware use
app.use(cors());
app.use(express.json());

//connect to mongoab
const uri = "mongodb+srv://ghostzen:ghostzen111@cluster0-tvhfs.gcp.mongodb.net/familytree?retryWrites=true&w=majority"
//const uri = "mongodb://localhost:27017/familytree"
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Mongodb database connection established successfully");
})

const port = process.env.PORT||3000;
app.listen(port, () => {
    console.log(`Server running is runnig on port: ${port}`)
});
 


