const User = require('../models/User');
const Appointment = require('../models/Appointment');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('customer', 'name email')
      .populate('dealer', 'name email')
      .sort({ date: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const mongoose = require('mongoose');
const User = require('../models/User');
const Appointment = require('../models/Appointment');

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await Appointment.deleteMany({
      $or: [
        { customer: new mongoose.Types.ObjectId(userId) },
        { dealer: new mongoose.Types.ObjectId(userId) }
      ]
    });

    res.json({ message: "User and related appointments deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const pending = await Appointment.countDocuments({ status: 'Pending' });
    const completed = await Appointment.countDocuments({ status: 'Completed' });
    res.json({ totalUsers, totalAppointments, pending, completed });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getDealers = async (req, res) => {
  try {
    const dealers = await User.find({ role: 'dealer', dealerStatus: 'approved' }).select('-password');
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getPendingDealers = async (req, res) => {
  try {
    const dealers = await User.find({ role: 'dealer', dealerStatus: 'pending' }).select('-password');
    res.json(dealers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const approveDealer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { dealerStatus: 'approved' },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const rejectDealer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { dealerStatus: 'rejected' },
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllUsers, getAllAppointments, deleteUser, getStats, getDealers, getPendingDealers, approveDealer, rejectDealer };