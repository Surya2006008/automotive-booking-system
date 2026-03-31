const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  const { dealer, service, vehicle, date, time, notes } = req.body;
  try {
    const conflict = await Appointment.findOne({ dealer, date, time });
    if (conflict) return res.status(409).json({ message: 'This slot is already booked' });
    const appointment = await Appointment.create({
      customer: req.user._id, dealer, service, vehicle, date, time, notes
    });
    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getMyAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ customer: req.user._id })
      .populate('dealer', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    if (appointment.customer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });

    const { service, vehicle, date, time, notes } = req.body;
    if (date && time) {
      const conflict = await Appointment.findOne({
        dealer: appointment.dealer, date, time, _id: { $ne: appointment._id }
      });
      if (conflict) return res.status(409).json({ message: 'Slot already booked' });
    }
    Object.assign(appointment, { service, vehicle, date, time, notes });
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    if (appointment.customer.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await appointment.deleteOne();
    res.json({ message: 'Appointment cancelled' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDealerAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ dealer: req.user._id })
      .populate('customer', 'name email phone')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    appointment.status = req.body.status;
    await appointment.save();
    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  bookAppointment, getMyAppointments, updateAppointment,
  cancelAppointment, getDealerAppointments, updateStatus
};
