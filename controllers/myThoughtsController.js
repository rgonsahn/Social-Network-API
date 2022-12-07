const { Opinion, User } = require('../models');
module.exports = {
    // Get your thoughts
    getOpinion(req, res) {
        Opinion.find({})
            .then((opinion) => res.json(opinion))
            .catch((err) => res.status(500).json(err))
    },

    // Get Single thought
    getSingleOpinion(req, res) {
        Opinion.findOne({ _id: req.params.opinionId })
            .select('-__v')
            .then((opinion) =>
                !opinion
                    ? res.status(404).json({ message: "No opinion/thought found with this ID" }) : res.json(opinion)
            )
            .catch((err) => res.status(500).json(err));
    },

    createOpinion(req, res) {
        Opinion.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { opinions: _id } },
                    { new: true }
                );
            }).then((opinion) =>
                !opinion
                    ? res.status(404).json({ message: "No user found with this ID!" }) : res.json(opinion)
            )
            .catch((err) => res.status(500).json(err));
    },
    // update an opinion
    updateOpinion(req, res) {
        Opinion.findOneAndUpdate(
            { _id: req.params.opinionId },
            { $set: req.body },
            { runTheValidators: true, New: true }
        ).then((user) =>
            !user
                ? res.status(404).json({ message: "No opinion found with this ID!" }) : res.json(user)
        ).catch((err) => res.status(500).json(err));
    },
    // delete an opinion
    deleteOpinion(req, res) {
        Opinion.findOneAndUpdate({ _id: req.params.opinionId }
        ).then((opinion) =>
            !opinion
                ? res.status(404).json({ message: "No opinion found with this ID!" }) : User.findOneAndUpdate(
                    { opinions: req.params.opinionId },
                    { $pull: { opinions: req.params.opinionId } },
                    { new: true }
                )
        ).then((user) =>
            !user
                ? res.status(404).json({ message: "Opinion deleted no user was found!" }) : res.json({ message: "Opinion has been successfully deleted!" })
        )
            .catch((err) => res.status(500).json(err));
    },
    // create a reaction
    createReact(req,res){
        Opinion.findOneAndUpdate(
            {_id:req.params.opinionId},
            {$addToSet: {reacts:req.body}},
            {runValidators:true, new:true}
        ).then((opinion)=>
        !opinion
        ? res.status(404).json({message:"No opinion matches that id!"}):res.json(opinion)
        )
        .catch((err)=> res.status(500).json(err));
    },
    // delete's reaction
    deleteReact(req,res){
        Opinion.findOneAndUpdate(
            {_id:req.params.opinionId},
            {$addToSet: {reacts:req.body}},
            {runValidators:true, new:true}
        ).then((opinion)=>
        !opinion
        ? res.status(404).json({message:"No opinion matches that id!"}):res.json(opinion)
        )
        .catch((err)=> res.status(500).json(err));
    }
}