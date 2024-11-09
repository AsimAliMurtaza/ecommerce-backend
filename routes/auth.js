const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
});


router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Log the email to verify it's being received
      console.log('Login attempt for email:', email);
  
      const user = await User.findOne({ email });
  
      // If no user is found, return an error
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // If password is incorrect, return an error
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Create JWT token with user id
      const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });
  
      // Send the token and user name to the frontend
      res.status(200).json({
        message: 'Login successful',
        token,
        name: user.username, // Include the user's name
      });
    } catch (err) {
      console.error('Error during login:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
