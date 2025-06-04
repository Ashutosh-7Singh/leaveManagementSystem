const LeaveApplication = require('../models/LeaveApplication');
const User = require('../models/User');

// Apply Leave
exports.applyLeave = async (req, res) => {
  const { leaveType, date, slot, reason } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const leaveAmount = (slot === 'firstHalf' || slot === 'secondHalf') ? 0.5 : 1;

    if (user[leaveType] < leaveAmount) {
      return res.status(400).json({ message: `Insufficient ${leaveType} balance` });
    }

    user[leaveType] -= leaveAmount;
    await user.save();

    const leave = new LeaveApplication({
      user: user._id,
      leaveType,
      date,
      slot,
      reason,
      history: [{
        status: 'leaveApplied',
        updatedBy: req.user.id,
        updatedAt: new Date(),
        remarks: reason
      }]
    });

    await leave.save();

    res.status(201).json({
      message: 'Leave applied successfully',
      data: {
        ...leave.toObject(),
        remainingBalance: user[leaveType]
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get pending leave applications (admin)
exports.getPendingLeaves = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({ status: 'leaveApplied' }).populate('user');
    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Approve a leave
// Approve a leave
exports.approveLeave = async (req, res) => {
  const { leaveId } = req.params;

  try {
    let leave = await LeaveApplication.findById(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = 'approved';
    leave.approvedBy = req.user.id;
    leave.history.push({
      status: 'approved',
      updatedBy: req.user.id,
      updatedAt: new Date()
    });

    await leave.save();

    // Populate the 'user' field after saving
    leave = await LeaveApplication.findById(leaveId).populate('user');

    res.status(200).json({ message: 'Leave approved', data: leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.approveLeave = async (req, res) => {
//   const { leaveId } = req.params;

//   try {
//     const leave = await LeaveApplication.findById(leaveId);
//     if (!leave) return res.status(404).json({ message: 'Leave not found' });

//     leave.status = 'approved';
//     leave.approvedBy = req.user.id;
//     leave.history.push({
//       status: 'approved',
//       updatedBy: req.user.id,
//       updatedAt: new Date()
//     });

//     await leave.save();
//     res.status(200).json({ message: 'Leave approved', data: leave });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Reject a leave
exports.rejectLeave = async (req, res) => {
  const { leaveId } = req.params;
  const { reason } = req.body;

  try {
    const leave = await LeaveApplication.findById(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    leave.status = 'rejected';
    leave.adminRemarks = reason;
    leave.approvedBy = req.user.id;
    leave.history.push({
      status: 'rejected',
      updatedBy: req.user.id,
      updatedAt: new Date(),
      remarks: reason
    });

    await leave.save();

    const user = await User.findById(leave.user);
    if (user) {
      const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;
      user[leave.leaveType] += leaveAmount;
      await user.save();
    }

    // Re-fetch with populated user
    const populatedLeave = await LeaveApplication.findById(leaveId).populate('user');

    res.status(200).json({ message: 'Leave rejected', data: populatedLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.rejectLeave = async (req, res) => {
//   const { leaveId } = req.params;
//   const { reason } = req.body;

//   try {
//     const leave = await LeaveApplication.findById(leaveId);
//     if (!leave) return res.status(404).json({ message: 'Leave not found' });

//     leave.status = 'rejected';
//     leave.adminRemarks = reason;
//     leave.approvedBy = req.user.id;
//     leave.history.push({
//       status: 'rejected',
//       updatedBy: req.user.id,
//       updatedAt: new Date(),
//       remarks: reason
//     });

//     await leave.save();

//     const user = await User.findById(leave.user);
//     if (user) {
//       const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;
//       user[leave.leaveType] += leaveAmount;
//       await user.save();
//     }

//     res.status(200).json({ message: 'Leave rejected', data: leave });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// Reapply for a rejected leave



exports.reapplyLeave = async (req, res) => {
  const { leaveId } = req.params;
  const { reason, leaveType, date, slot } = req.body;

  try {
    const leave = await LeaveApplication.findById(leaveId);
    if (!leave) return res.status(404).json({ message: 'Leave not found' });

    if (leave.status !== 'rejected') {
      return res.status(400).json({ message: 'Only rejected leaves can be reapplied' });
    }

    const user = await User.findById(leave.user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Restore previous leave balance if it's being reapplied
    const oldLeaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;
    user[leave.leaveType] += oldLeaveAmount; // Revert the old deduction

    // Apply new leave details
    const newLeaveAmount = (slot === 'firstHalf' || slot === 'secondHalf') ? 0.5 : 1;

    if (user[leaveType] < newLeaveAmount) {
      return res.status(400).json({ message: `Insufficient ${leaveType} balance` });
    }

    user[leaveType] -= newLeaveAmount;
    await user.save();

    // Update the leave document with new values
    leave.status = 'leaveApplied';
    leave.reason = reason;
    leave.leaveType = leaveType;
    leave.date = date;
    leave.slot = slot;
    leave.adminRemarks = undefined;
    leave.approvedBy = undefined;

    leave.history.push({
      status: 'reapplied',
      updatedBy: req.user.id,
      updatedAt: new Date(),
      remarks: reason
    });

    await leave.save();

    const populatedLeave = await LeaveApplication.findById(leaveId).populate('user');

    res.status(200).json({
      message: 'Leave reapplied successfully',
      data: {
        ...populatedLeave.toObject(),
        remainingBalance: user[leaveType]
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// exports.reapplyLeave = async (req, res) => {
//   const { leaveId } = req.params;

//   try {
//     const leave = await LeaveApplication.findById(leaveId);
//     if (!leave) return res.status(404).json({ message: 'Leave not found' });

//     if (leave.status !== 'rejected') {
//       return res.status(400).json({ message: 'Only rejected leaves can be reapplied' });
//     }

//     const user = await User.findById(leave.user);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;

//     if (user[leave.leaveType] < leaveAmount) {
//       return res.status(400).json({ message: `Insufficient ${leave.leaveType} balance` });
//     }

//     user[leave.leaveType] -= leaveAmount;
//     await user.save();

//     leave.status = 'leaveApplied';
//     leave.adminRemarks = undefined;
//     leave.approvedBy = undefined;
//     leave.history.push({
//       status: 'reapplied',
//       updatedBy: req.user.id,
//       updatedAt: new Date()
//     });

//     await leave.save();

//     const populatedLeave = await LeaveApplication.findById(leaveId).populate('user');

//     res.status(200).json({
//       message: 'Leave reapplied successfully',
//       data: {
//         ...populatedLeave.toObject(),
//         remainingBalance: user[leave.leaveType]
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// exports.reapplyLeave = async (req, res) => {
//   const { leaveId } = req.params;

//   try {
//     const leave = await LeaveApplication.findById(leaveId);
//     if (!leave) return res.status(404).json({ message: 'Leave not found' });

//     if (leave.status !== 'rejected') {
//       return res.status(400).json({ message: 'Only rejected leaves can be reapplied' });
//     }

//     const user = await User.findById(leave.user);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;

//     if (user[leave.leaveType] < leaveAmount) {
//       return res.status(400).json({ message: `Insufficient ${leave.leaveType} balance` });
//     }

//     user[leave.leaveType] -= leaveAmount;
//     await user.save();

//     leave.status = 'leaveApplied';
//     leave.adminRemarks = undefined;
//     leave.approvedBy = undefined;
//     leave.history.push({
//       status: 'reapplied',
//       updatedBy: req.user.id,
//       updatedAt: new Date()
//     });

//     await leave.save();

//     res.status(200).json({
//       message: 'Leave reapplied successfully',
//       data: {
//         ...leave.toObject(),
//         remainingBalance: user[leave.leaveType]
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };





// Get own leaves (including rejected)

exports.getMyLeaves = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({
      user: req.user.id,
      status: { $in: ['leaveApplied', 'rejected'] }
    }).populate('user');

    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getMyLeaves = async (req, res) => {
//   try {
//     const leaves = await LeaveApplication.find({
//       user: req.user.id,
//       status: { $in: ['leaveApplied', 'rejected'] }
//     });

//     res.status(200).json({ data: leaves });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// const LeaveApplication = require('../models/LeaveApplication');
// const User = require('../models/User');


// exports.applyLeave = async (req, res) => {
//   const { leaveType, date, slot, reason } = req.body;

//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const leaveAmount = (slot === 'firstHalf' || slot === 'secondHalf') ? 0.5 : 1;

//     // Check for enough balance
//     if (user[leaveType] < leaveAmount) {
//       return res.status(400).json({ message: `Insufficient ${leaveType} balance` });
//     }

//     // Deduct leave
//     user[leaveType] -= leaveAmount;
//     await user.save();

//     const leave = new LeaveApplication({
//       user: user._id,
//       leaveType,
//       date,
//       slot,
//       reason,
//     });

//     await leave.save();

//     res.status(201).json({
//       message: 'Leave applied successfully',
//       data: {
//         ...leave.toObject(),
//         remainingBalance: user[leaveType]
//       }
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // // Apply for leave
// // exports.applyLeave = async (req, res) => {
// //   const { leaveType, date, slot, reason } = req.body;

// //   const leave = new LeaveApplication({
// //     user: req.user.id,
// //     leaveType,
// //     date,
// //     slot,
// //     reason
// //   });

// //   await leave.save();
// //   res.status(201).json({ message: 'Leave applied successfully', data: leave });
// // };

// // Get all pending leave applications (for admin)
// exports.getPendingLeaves = async (req, res) => {
//   const leaves = await LeaveApplication.find({ status: 'leaveApplied' }).populate('user');
//   res.status(200).json({ data: leaves });
// };

// // Approve a leave (Admin only)
// exports.approveLeave = async (req, res) => {
//   const { leaveId } = req.params;

//   const leave = await LeaveApplication.findByIdAndUpdate(
//     leaveId,
//     { status: 'approved', approvedBy: req.user.id },
//     { new: true }
//   );

//   if (!leave) return res.status(404).json({ message: 'Leave not found' });

//   res.status(200).json({ message: 'Leave approved', data: leave });
// };

// exports.rejectLeave = async (req, res) => {
//   const { leaveId } = req.params;
//   const { reason } = req.body;

//   const leave = await LeaveApplication.findByIdAndUpdate(
//     leaveId,
//     {
//       status: 'rejected',
//       adminRemarks: reason,
//       rejectedBy: req.user.id
//     },
//     { new: true }
//   );

//   if (!leave) return res.status(404).json({ message: 'Leave not found' });

//   // Add back leave
//   const user = await User.findById(leave.user);
//   if (user) {
//     const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;
//     user[leave.leaveType] += leaveAmount;
//     await user.save();
//   }

//   res.status(200).json({ message: 'Leave rejected', data: leave });
// };

// exports.reapplyLeave = async (req, res) => {
//   const { leaveId } = req.params;

//   try {
//     const leave = await LeaveApplication.findById(leaveId);
//     if (!leave) return res.status(404).json({ message: 'Leave not found' });

//     if (leave.status !== 'rejected') {
//       return res.status(400).json({ message: 'Only rejected leaves can be reapplied' });
//     }

//     const user = await User.findById(leave.user);
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     const leaveAmount = (leave.slot === 'firstHalf' || leave.slot === 'secondHalf') ? 0.5 : 1;

//     // Check if user has enough balance again
//     if (user[leave.leaveType] < leaveAmount) {
//       return res.status(400).json({ message: `Insufficient ${leave.leaveType} balance` });
//     }

//     // Deduct leave again
//     user[leave.leaveType] -= leaveAmount;
//     await user.save();

//     // Update leave status
//     leave.status = 'leaveApplied';
//     leave.adminRemarks = undefined; // Optional: clear rejection remarks
//     leave.approvedBy = undefined;   // Optional: clear approval info
//     await leave.save();

//     res.status(200).json({
//       message: 'Leave reapplied successfully',
//       data: {
//         ...leave.toObject(),
//         remainingBalance: user[leave.leaveType]
//       }
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getMyLeaves = async (req, res) => {
//   try {
//     const leaves = await LeaveApplication.find({
//       user: req.user.id,
//       status: { $in: ['leaveApplied', 'rejected'] }
//     });

//     res.status(200).json({ data: leaves });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


// // Reject a leave (Admin only)
// // exports.rejectLeave = async (req, res) => {
// //   const { leaveId } = req.params;
// //   const { reason } = req.body;

// //   const leave = await LeaveApplication.findByIdAndUpdate(
// //     leaveId,
// //     {
// //       status: 'rejected',
// //       adminRemarks: reason,
// //       approvedBy: req.user.id
// //     },
// //     { new: true }
// //   );
// // if (leave) {
// //   const user = await User.findById(leave.user);
// //   if (user) {
// //     user[leave.leaveType] += 1; // Add back the leave
// //     await user.save();
// //   }
// // }

// //   if (!leave) return res.status(404).json({ message: 'Leave not found' });

// //   res.status(200).json({ message: 'Leave rejected', data: leave });
// // };



// Get all leaveApplied or rejected leaves (Admin only)
exports.getAllLeavesForAdmin = async (req, res) => {
  try {
    const leaves = await LeaveApplication.find({
      status: { $in: ['leaveApplied', 'rejected'] }
    }).populate('user');

    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Get leaves by status list (Admin only)
exports.getLeavesByStatus = async (req, res) => {
  const { statuses } = req.query;

  if (!statuses) {
    return res.status(400).json({ message: 'Please provide at least one status' });
  }

  // Convert comma-separated statuses to array
  const statusArray = statuses.split(',').map(status => status.trim());

  try {
    const leaves = await LeaveApplication.find({
      status: { $in: statusArray }
    }).populate('user');

    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// exports.getLeavesByStatusUser = async (req, res) => {
//   const { statuses } = req.query;

//   if (!statuses) {
//     return res.status(400).json({ message: 'Please provide at least one status' });
//   }

//   const statusArray = statuses.split(',').map(status => status.trim());

//   try {
//     let query = { status: { $in: statusArray } };

//     // If the user is not an admin, restrict to their own leaves
//     if (req.user.role !== 'Admin') {
//       query.user = req.user.id;
//     }

//     const leaves = await LeaveApplication.find(query).populate('user');
//     res.status(200).json({ data: leaves });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


exports.getLeavesByStatusUser = async (req, res) => {
  const { statuses } = req.query;

  if (!statuses) {
    return res.status(400).json({ message: 'Please provide at least one status' });
  }

  const statusArray = statuses.split(',').map(status => status.trim());

  try {
    const query = {
      status: { $in: statusArray },
      user: req.user.id  // ✅ Filter by logged-in user only
    };

    const leaves = await LeaveApplication.find(query).populate('user');
    res.status(200).json({ data: leaves });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
