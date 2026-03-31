import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

const SERVICES = ['Oil Change', 'Tyre Rotation', 'Brake Inspection', 'Engine Tune-up', 'AC Service', 'Full Service'];
const TIMES = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'];

const BookAppointment = () => {
  const [dealers, setDealers] = useState([]);
  const [form, setForm] = useState({ dealer: '', vehicle: '', date: '', time: '', notes: '' });
  const [selectedServices, setSelectedServices] = useState([]);
  const [customIssue, setCustomIssue] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/admin/dealers').then(({ data }) => setDealers(data));
  }, []);

  const toggleService = (service) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const allServices = [...selectedServices];
    if (customIssue.trim()) allServices.push(customIssue.trim());
    if (allServices.length === 0) {
      setError('Please select at least one service or describe your issue.');
      return;
    }

    try {
      await axiosInstance.post('/appointments', {
        ...form,
        service: allServices.join(', ')
      });
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4" style={{ maxWidth: '540px' }}>
        <h5 className="mb-3">Book Appointment</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Select Dealer</label>
            <select className="form-select" value={form.dealer}
              onChange={e => setForm({ ...form, dealer: e.target.value })} required>
              <option value="">-- Choose dealer --</option>
              {dealers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Services <span className="text-muted small">(select all that apply)</span></label>
            <div className="d-flex flex-wrap gap-2 p-3 border rounded">
              {SERVICES.map(s => (
                <div key={s}
                  onClick={() => toggleService(s)}
                  style={{ cursor: 'pointer' }}
                  className={`badge fs-6 px-3 py-2 ${selectedServices.includes(s) ? 'bg-dark' : 'bg-light text-dark border'}`}>
                  {selectedServices.includes(s) ? '✓ ' : ''}{s}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Other issue? <span className="text-muted small">(describe if not listed above)</span></label>
            <input className="form-control" placeholder="e.g. Strange noise when braking..."
              value={customIssue} onChange={e => setCustomIssue(e.target.value)} />
          </div>

          <div className="mb-3">
            <label className="form-label">Vehicle (e.g. Honda City - MH12AB1234)</label>
            <input className="form-control" value={form.vehicle}
              onChange={e => setForm({ ...form, vehicle: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" value={form.date}
              min={new Date().toISOString().split('T')[0]}
              onChange={e => setForm({ ...form, date: e.target.value })} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Time Slot</label>
            <select className="form-select" value={form.time}
              onChange={e => setForm({ ...form, time: e.target.value })} required>
              <option value="">-- Choose time --</option>
              {TIMES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Additional Notes (optional)</label>
            <textarea className="form-control" rows={2} value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          {selectedServices.length > 0 && (
            <div className="alert alert-secondary py-2">
              <strong>Selected:</strong> {selectedServices.join(', ')}
              {customIssue && `, ${customIssue}`}
            </div>
          )}

          <button type="submit" className="btn btn-dark w-100">Confirm Booking</button>
        </form>
      </div>
    </>
  );
};

export default BookAppointment;
