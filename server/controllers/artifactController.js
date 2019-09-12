const mongoose = require('mongoose');
const multer = require('multer');
const AF = mongoose.model('artifacts');

const storage = multer.diskStorage({
   destination: function (req,file,cb) {
       cb(null,'./server/');
   },
    filename: function (req,file,cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req,file,cb) => {
    if (file.mimeType === 'image/jpeg' || file.mimeType === 'image/png') {
        cb(null,true);
    } else {
        cb(null,false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//Find all collection points
const getArtifacts = function(req,res){
    AF.find(function (err, artifacts) {
        if(!err){
            //res.send(collectPoints);
            res.render('artifacts', {
                title:'Artifacts',
                artifact: artifacts
            })
        }else {
            res.sendStatus(404);
        }
    });
};

const uploadArtifacts = function (req,res) {
    var af = new AF({
        "name": req.body.name,
        "url": req.body.url,
        "description": req.body.description,
        "uploadTime": Date.now(),
        "tag": {
            "person": req.body.person,
            "artifactTime": req.body.artifactTime,
            "userID": req.body.userID,
            "place": req.body.place
        },
        "visibility": req.body.visibility
    });

    af.save(function (err,newAF) {
        if (!err){
            res.send(newAF);
        } else {
            res.sendStatus(400);
        }
    });
};

module.exports = {
    getArtifacts,
    uploadArtifacts
};