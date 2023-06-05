const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true
    },
    thoughts: [thoughtSchema],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    ]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;