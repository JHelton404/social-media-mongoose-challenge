const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  
  getUser(req, res) {
    User.find()
      .then(async (users) => {
        const userObj = {
          users
        }
        return res.json(userObj);
      })
      .catch((err) => {
        return res.status(500).json(err);
      })
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
    .select('-__V')
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user with that ID'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err))  
  },

  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with that ID'})
          : Thought.findOneAndUpdate(
            { thoughts: req.params.userId },
            { $pull: { thoughts: req.params.userId}},
            { new: true }
          )
      ) 
      .then((thought) => 
        !thought 
          ? res.status(404).json({
            message: 'User deleted, but no thoughts found',
            })
          : res.json({ message: 'User succesfully deleted' })
      )
      .catch((err) => {
        res.status(500).json(err);
      })
  },

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) => 
        !user
          ? res.status(404).json({
            message: 'No user found with that ID'
          })
          : res.json(user)
      )
      .catch((err) => {
        res.status(500).json(err);
      })
  },

  removeFriend(req, res) {
    dent.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { assignment: { friendId: req.params.friendId } } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: 'No user found with that ID :(' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
}