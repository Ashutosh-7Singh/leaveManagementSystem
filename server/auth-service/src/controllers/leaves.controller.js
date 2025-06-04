const Leave = require('../models/Leaves');
const User = require('../models/User');


// Create leave (Admin only)
exports.createLeave = async (req, res) => {
  try {
    // Ensure only admin can create leave types
    if (req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Only admin can create leaves' });
    }

    const { type, initialBalance } = req.body;

    // Initialize all slots with empty reason
    const slots = [
      { slot: 'full', reason: '' },
      { slot: 'firstHalf', reason: '' },
      { slot: 'secondHalf', reason: '' }
    ];

    // Prevent duplicate leave types
    const existingLeave = await Leave.findOne({ type });
    if (existingLeave) {
      return res.status(400).json({ message: 'Leave type already exists' });
    }

    const newLeave = new Leave({
      type,
      initialBalance,
      slots,
      createdBy: req.user.id
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave created successfully', leave: newLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all leaves
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('createdBy', 'name email');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Helper to calculate month difference
const monthDiff = (startDate, endDate) => {
  return (
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  );
};
exports.getUserLeaves = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const leaves = await Leave.find();

    const leaveSummary = leaves.map((leave) => {
      let balance = 0;

      if (leave.type === 'earnedLeaves') {
        const earned = Math.floor(monthDiff(new Date(user.dateOfJoining), new Date()));
        balance = Math.min(earned, 12);
      } else {
        balance = user[leave.type]; // sickLeaves or casualLeaves
      }

      return {
        type: leave.type,
        balance,
        slots: leave.slots
      };
    });

    res.json({ user: user.name, leaves: leaveSummary });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
