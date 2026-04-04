const express = require('express');
const router = express.Router();
const { protect, roleCheck } = require('../middleware/authMiddleware');
const { getAllUsers, getAllAppointments, deleteUser, getStats, getDealers, getPendingDealers, approveDealer, rejectDealer } = require('../controllers/adminController');

router.get('/dealers',                    protect, getDealers);
router.get('/dealers/pending',            protect, roleCheck('admin'), getPendingDealers);
router.put('/dealers/:id/approve',        protect, roleCheck('admin'), approveDealer);
router.put('/dealers/:id/reject',         protect, roleCheck('admin'), rejectDealer);
router.get('/users',                      protect, roleCheck('admin'), getAllUsers);
router.get('/appointments',               protect, roleCheck('admin'), getAllAppointments);
router.delete('/users/:id',               protect, roleCheck('admin'), deleteUser);
router.get('/stats',                      protect, roleCheck('admin'), getStats);

module.exports = router;