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



// // Helper to calculate month difference
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


      // if (leave.type === 'earnedLeaves') {
      //   // Use a hardcoded end date for testing
      //   const endDate = new Date('2027-06-05');

      //   // FIXED: correct use of dateOfJoining and endDate
      //   const earned = Math.floor(monthDiff(new Date(user.dateOfJoining), endDate));
      //   console.log(`Earned months for ${user.name}:`, earned);

      //   balance = Math.min(earned, 12);
      // } else {
      //   balance = user[leave.type]; // sickLeaves or casualLeaves
      // }
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



// // Helper to calculate month difference
// const monthDiff = (startDate, endDate) => {
//   return (
//     (endDate.getFullYear() - startDate.getFullYear()) * 12 +
//     (endDate.getMonth() - startDate.getMonth())
//   );
// };

// exports.getUserLeaves = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//  if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const leaves = await Leave.find();

//     // Get current year and calculate April 1st of this year
//        // 👉 Hardcoded current date for testing
//     const now = new Date("2028-04-01"); // Change this to simulate different "today" dates
//     // const now = new Date();
//     const currentYear = now.getFullYear();
//     const aprilFirst = new Date(`${currentYear}-04-01`);

//     // If today is before April 1, consider the previous fiscal year
//     if (now < aprilFirst) {
//       aprilFirst.setFullYear(currentYear - 1);
//     }

//     const leaveSummary = leaves.map((leave) => {
//       let balance = 0;

//       if (leave.type === 'earnedLeaves') {
//         const monthDifference = monthDiff(new Date(user.dateOfJoining), aprilFirst);
//         // Only grant earned leaves if user joined more than 12 months before April 1
//         balance = monthDifference >= 12 ? 12 : 0;
//       } else if (leave.type === 'sickLeaves') {
//         balance = 5;
//       } else if (leave.type === 'casualLeaves') {
//         balance = 7;
//       }

//       // Optionally, you can subtract leaves taken this year if you track that somewhere
//       // For now, this gives the reset values as of April 1

//       return {
//         type: leave.type,
//         balance,
//         slots: leave.slots
//       };
//     });

//     res.json({ user: user.name, leaves: leaveSummary });
//   } catch (err) {
//     console.error('Error in getUserLeaves:', err.message);
//     res.status(500).json({ error: err.message });
//   }
// };
