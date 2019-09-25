const router = require('express').Router()
let Artifact = require('../models/artifacts.model')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//upload artifacts
router.post('/uploadArtifacts',upload.single('image'), async (req, res) => {
    const newArtifact = new Artifact({
        "name": req.body.name,
        "url": req.body.url,
        "description": req.body.description,
        "editTime": Date.now(),
        "tag": req.body.tag,
        "category": req.body.category,
        "artifactTime": req.body.artifactTime,
        "userID": req.body.userID,
        "visibility": req.body.visibility
    });

    await newArtifact.save()
        .then(() => res.json('Artifact added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get all artifacts
router.get('/artifacts', async (req, res) => {
    await Artifact.find()
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get artifacts by id
router.get('/artifacts/:id', async (req, res) => {
    await Artifact.findById(req.params.id)
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete artifacts by id
router.delete('/artifacts/:id', async (req, res) => {
    await Artifact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Artifacts deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;