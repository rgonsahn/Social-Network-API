const {User,Opinion}= require("../models");

module.exports ={
//  get users 
getUser(req, res) {
    User.find({})
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err))
},
// get one user
getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .populate("opinions")
    .populate("friends")
    .select("-__v")
    .then((user) =>
    !user
    ? res.status(404).json({ message: "No User found with this ID!"})
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
//  create a user
createUser(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
    });
},
// update a user 
updateUser(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: "No User found with that ID!" })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
// delete user 
deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
    !user
    ? res.status(404).json({ message: "No User found with this ID!" })
    : Opinion.deleteMany({ _id: { $in: user.opinions }})
    )
    .then(() => res.json({ message: "User and Opinion deleted!" }))
    .catch((err) => res.status(500).json(err));
},
//add friend

addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId }},
        { runValidators: true, new: true }
    )
    .then((user) =>
    !user
    ? res.status(404).json({ message: "No User found with this ID!" })
    : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},
deleteFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }},
        { new: true }
    )
    .then(
        (user) =>
        !user
        ? res.status(404).json({ message: "No User found with this ID!" })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
},


};
