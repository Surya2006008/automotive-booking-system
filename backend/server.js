const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin: [
    'https://automotive-booking-system.vercel.app',
    'https://automotive-booking-system-81t0hgf7c-surya2006008s-projects.vercel.app'
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// app.use(cors({
//   origin: 'https://automotive-booking-system.vercel.app/', // ← your actual Vercel URL
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
// // ✅ Proper CORS (single config)
// app.use(cors({
//   origin: '*',
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));