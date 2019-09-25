const mongoose = require('mongoose')
/*
 ** Schema for collectPoints.
 ** collectPoints are the location of where recycling services are provided
 */
const userSchema = new mongoose.Schema({
    "username": String,
    "email": String,
    "password": String
});

const User = mongoose.model('User', userSchema)

module.exports = User