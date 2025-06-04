const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getPendingLeaves,
  approveLeave,
  rejectLeave,
  reapplyLeave,
  getMyLeaves,
  getAllLeavesForAdmin,
  getLeavesByStatus,
  getLeavesByStatusUser
} = require('../controllers/leaveApplication.controller');
const auth = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdminMiddleware');

// Apply leave (any user)
router.post('/apply', auth, applyLeave);

// Get all pending leaves (admin only)
router.get('/pending', auth, isAdmin, getPendingLeaves);

// Approve a leave (admin only)
router.put('/approve/:leaveId', auth, isAdmin, approveLeave);

// Reject a leave (admin only)
router.put('/reject/:leaveId', auth, isAdmin, rejectLeave);

// reapply
router.put('/reapply/:leaveId', auth, reapplyLeave);

router.get('/myleaves', auth, getMyLeaves);
router.get('/alladminleaves', auth, isAdmin, getAllLeavesForAdmin);
router.get('/filter-by-status', auth, isAdmin, getLeavesByStatus);
// Allow both Admin and User to access
router.get('/filter-by-statusUser', auth, getLeavesByStatusUser);


module.exports = router;
