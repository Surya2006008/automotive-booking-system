const express = require('express');
const router = express.Router();
const { protect, roleCheck } = require('../middleware/authMiddleware');
const { getAllUsers, getAllAppointments, deleteUser, getStats, getDealers } = require('../controllers/adminController');

router.get('/dealers',      protect, getDealers);
router.get('/users',        protect, roleCheck('admin'), getAllUsers);
router.get('/appointments', protect, roleCheck('admin'), getAllAppointments);
router.delete('/users/:id', protect, roleCheck('admin'), deleteUser);
router.get('/stats',        protect, roleCheck('admin'), getStats);

module.exports = router;