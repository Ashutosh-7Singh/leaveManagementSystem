const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  slot: {
    type: String,
    enum: ['full', 'firstHalf', 'secondHalf'],
    required: true
  },
  reason: {
    type: String,
    default: ''
  }
});

const leaveSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['earnedLeaves', 'casualLeaves', 'sickLeaves'],
      required: true
    },
    initialBalance: { type: Number, required: true },
    slots: { type: [slotSchema], default: [] },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Leave', leaveSchema);


