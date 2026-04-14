const User = require('../models/User');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const { Resend } = require('resend');

const sendAdminEmail = async (dealer) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_USER,
      subject: '🚗 New Dealer Registration - SpeedServe',
      html: `
        <h2>New Dealer Registration Request</h2>
        <p><b>Name:</b> ${dealer.name}</p>
        <p><b>Email:</b> ${dealer.email}</p>
        <p><b>Phone:</b> ${dealer.phone}</p>
        <p><b>Shop Name:</b> ${dealer.shopName}</p>
        <p><b>Shop Address:</b> ${dealer.shopAddress}</p>
        <p><b>Shop Images:</b></p>
        ${
          dealer.shopImages && dealer.shopImages.length > 0
            ? dealer.shopImages.map(img => `<img src="${img}" width="200" style="margin:5px"/>`).join('')
            : '<p>No images</p>'
        }
        <br/>
        <p>Login to admin dashboard to approve or reject.</p>
      `,
    });
  } catch (error) {
    console.log('Email error:', error.message);
  }
};

// REGISTER
const register = async (req, res) => {
  const { name, email, password, role, phone, shopName, shopAddress, shopLocation } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userData = { name, email, password, role, phone };

    if (role === 'dealer') {
      userData.shopName = shopName;
      userData.shopAddress = shopAddress;
      userData.shopLocation = shopLocation ? JSON.parse(shopLocation) : {};
      userData.shopImages = req.files ? req.files.map(f => f.path) : [];
      userData.dealerStatus = 'pending';
    }

    const user = await User.create(userData);

    // send email to admin
    if (role === 'dealer') {
      await sendAdminEmail(user);
    }

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      dealerStatus: user.dealerStatus,
      token: generateToken(user._id),
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        dealerStatus: user.dealerStatus,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login };