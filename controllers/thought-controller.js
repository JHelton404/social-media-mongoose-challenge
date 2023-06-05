const { ObjectId } = require('mongoose').Types
const { Thought, User } = require('../models')

module.exports = {
 getThoughts(req, res) {
  Thought.find()
    .then(async (thoughts) => {
      const thoughtObj = {
        thoughts
      }
      return res.json(thoughtObj)
    })
    
  getSingleThought(req, res); {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .then((thought) => 
        !thought
          ? res.status(404).json({ message: 'No thought with that ID'})
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  }
 },

  async createThought(req, res) {
    try {
      const user = await User.findOne({ _id: req.body.userId })
      if(!user) {
        res.status(404).json({ message: "No user found with that ID" })
      } else {
        const thought = await Thought.create(req.body);
        return res.json(thought);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) => 
        res.json({ message: "Thought deleted" })
      )      
  },

  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => 
        !thought 
          ? res.status(404).json({ message: 'No thought with this ID' })
          : res.json(thought)
      )
  },

  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
      if(!thought) {
        res.status(404).json({ message: 'No thought found with that ID'})
      }
      else {
        res.json(thought)
      }
    } catch(err) {
      res.json(500).json(err)
    }
  },

  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
      if(!thought) {
        res.status(404).json({ message: 'No thought found with that ID'})
      } else {
        thought.reactions.pull({ _id: req.body.reactionId })
      }
    } catch(err) {
      res.json(500).json(err)
    }
  }
}