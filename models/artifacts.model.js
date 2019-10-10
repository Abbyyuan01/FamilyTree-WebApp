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
    "category": String,
    "artifactTime": Date,
    "user": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    "visibility": [String]
});

const Artifact = mongoose.model('Artifact', artifactSchema)

module.exports = Artifact