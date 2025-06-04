// models/LeaveApplication.js
const mongoose = require('mongoose');

const leaveApplicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  leaveType: {
    type: String,
    enum: ['sickLeaves', 'casualLeaves', 'earnedLeaves'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  slot: {
    type: String,
    enum: ['full', 'firstHalf', 'secondHalf'],
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['leaveApplied', 'approved', 'rejected'],
    default: 'leaveApplied'
  },
  adminRemarks: String,
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Assuming admins are also in User collection
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  history: [
    {
      status: String,
      updatedAt: { type: Date, default: Date.now },
      updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      remarks: String
    }
  ]
});

module.exports = mongoose.model('LeaveApplication', leaveApplicationSchema);
