const opinionController = require('../../controllers/opinionController');

const router= require('express').Router();

const{
    getOpinion,
    getSingleOpinion,
    createOpinion,
    updateOpinion,
    deleteOpinion,
    createReact,
    deleteReact
} = require("../../controllers/opinionController");

// Get and Post Opinion 
router.route('/').get(getOpinion).post(createOpinion);

// Get put delete by ID one opinion
router.route('/:opinionId')
.get(getSingleOpinion)
.put(updateOpinion)
.delete(deleteOpinion); 
// Post new reactions
router.route("/:opinionId/reactions").post(createReact);

// delete reactions
router.route("/:opinionId/reactions/:reactId").delete(deleteReact);


module.exports = router;