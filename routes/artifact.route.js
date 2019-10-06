const router = require('express').Router()
let Artifact = require('../models/artifacts.model')
const User = require('../models/user.model')
const multer = require('multer');
const { Storage } = require("@google-cloud/storage");
const {format} = require('util');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './server/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

const GOOGLE_CLOUD_PROJECT_ID = 'temporal-state-247907'; // project ID

// Instantiate a storage client
const storage = new Storage({
    projectId: GOOGLE_CLOUD_PROJECT_ID
  });

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };

// Multer is required to process file uploads and make them available via
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5  // no larger than 5mb, you can change as needed.
    },
    fileFilter: fileFilter
});

const bucketName = 'ghostzen-image-upload';
// A bucket is a container for objects (files).
const bucket = storage.bucket(bucketName);

//upload artifacts
router.post('/uploadArtifacts', upload.single('image'), async (req, res) => {

    const user = await User.findById(req.body.user)
    if (!user) return res.status(400).send('Invalid user.');

    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
        res.status(403).send(err);
    });

    blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
        );

        const newArtifact = new Artifact({
            "name": req.body.name,
            "url": publicUrl,
            "description": req.body.description,
            "editTime": Date.now(),
            "tag": req.body.tag,
            "artifactTime": req.body.artifactTime,
            "user": req.body.user,
            // "visibility": req.body.visibility
        });

        newArtifact.save()
        .then((newArtifact) => res.status(200).json('Artifact added!'+newArtifact))
        .catch(err => res.status(400).json('Error: ' + err));
        // res.status(200).send(publicUrl);
        console.log(publicUrl)
    });

    blobStream.end(req.file.buffer);

});

//get all artifacts
router.get('/artifacts', async (req, res) => {
    await Artifact.find()
        .populate('user','username')
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get artifacts by id
router.get('/artifacts/:id', async (req, res) => {
    await Artifact.findById(req.params.id)
        .populate('user','username')
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

// update an artifact based on ID


//delete artifacts by id
router.delete('/artifacts/:id', async (req, res) => {
    await Artifact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Artifacts deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;