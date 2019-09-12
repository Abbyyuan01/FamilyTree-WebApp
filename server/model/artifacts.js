/*
** Schema for collectPoints.
** collectPoints are the location of where recycling services are provided
*/

//Mai: include the auto increment plugin by referring to it.
//Read this: 'https://www.npmjs.com/package/mongoose-auto-increment'.
var mongoose = require('mongoose');

var artifactSchema = mongoose.Schema(
    {   "id":Number,
        "name": String,
        "url": String,
        "description": String,
        "uploadTime": Date,
        "tag": {
            "person": String,
            "artifactTime": Date,
            "userID": Number,
            "place": String
        },
        "visibility": Boolean
    }
);

const artifacts = mongoose.model('artifacts',artifactSchema);

module.exports = artifacts;