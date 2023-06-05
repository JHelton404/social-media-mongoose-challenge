const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thought: {
      type: String,
      required: true,
      maxlength: 250
    },
    username: {
      type: String,
      required: true
    },
    currentDate: {
      type: Date,
      default: Date.now()
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
)

const Thought = model('thought', thoughtSchema);

module.exports = Thought;