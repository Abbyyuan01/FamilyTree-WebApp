var express = require('express');
var artifactRouter = express.Router();

var artifactController = require('../controllers/artifactController.js');

// get all artifacts
artifactRouter.get('/artifacts', artifactController.getArtifacts);

//upload Artifacts
artifactRouter.post('/artifacts', artifactController.uploadArtifacts);

module.exports = artifactRouter;