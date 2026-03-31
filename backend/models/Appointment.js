const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dealer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  service:  { type: String, required: true },
  vehicle:  { type: String, required: true },
  date:     { type: String, required: true },
  time:     { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'In Progress', 'Completed', 'Rejected'],
    default: 'Pending'
  },
  notes: { type: String },
}, { timestamps: true });

appointmentSchema.index({ dealer: 1, date: 1, time: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);
