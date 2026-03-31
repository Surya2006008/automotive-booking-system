const express = require('express');
const router = express.Router();
const { protect, roleCheck } = require('../middleware/authMiddleware');
const {
  bookAppointment, getMyAppointments, updateAppointment,
  cancelAppointment, getDealerAppointments, updateStatus
} = require('../controllers/appointmentController');

router.post('/',        protect, roleCheck('customer'), bookAppointment);
router.get('/my',       protect, roleCheck('customer'), getMyAppointments);
router.put('/:id',      protect, roleCheck('customer'), updateAppointment);
router.delete('/:id',   protect, roleCheck('customer'), cancelAppointment);

router.get('/dealer',         protect, roleCheck('dealer'), getDealerAppointments);
router.patch('/:id/status',   protect, roleCheck('dealer'), updateStatus);

module.exports = router;
