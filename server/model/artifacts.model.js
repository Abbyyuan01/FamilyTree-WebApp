const mongoose = require('mongoose')
/*
 ** Schema for collectPoints.
 ** collectPoints are the location of where recycling services are provided
 */
const artifactSchema = new mongoose.Schema({
    "name": String,
    "url": String,
    "description": String,
    "editTime": Date,
    "tag": String,
    "category": String,
    "artifactTime": Date,
    "userID": String,
    "visibility": Boolean
});

const Artifact = mongoose.model('Artifact', artifactSchema)

module.exports = Artifact