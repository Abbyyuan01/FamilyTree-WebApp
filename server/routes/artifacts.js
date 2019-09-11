const router = require('express').Router()
let Artifact = require('../model/artifacts.model')

//get all artifacts
router.get('/', async (req, res) => {
    await Artifact.find()
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//add artifacts
router.post('/add', async (req, res) => {
    const name = req.body.name
    const url = req.body.url
    const description = req.body.description
    const editTime = Date.parse(req.body.editTime)
    const tag = req.body.tag
    const category = req.body.category
    const artifactTime = Date.parse(req.body.artifactTime)
    const userID = req.body.userID
    const visibility = req.body.visibility

    const newArtifact = new Artifact({
        name,
        url,
        description,
        editTime,
        tag,
        category,
        artifactTime,
        userID,
        visibility
    })

    await newArtifact.save()
        .then(() => res.json('Artifact added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//get artifacts by id
router.get('/:id', async (req, res) => {
    await Artifact.findById(req.params.id)
        .then(artifacts => res.json(artifacts))
        .catch(err => res.status(400).json('Error: ' + err));
});

//delete artifacts by id
router.delete('/:id', async (req, res) => {
    await Artifact.findByIdAndDelete(req.params.id)
        .then(() => res.json('Artifacts deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;