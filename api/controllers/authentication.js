/*n
1.These modules will handle user registration, login, and logout functionality.
2.We will assume that we are using bcrypt for password hashing
3.JWT for token generation.

required packages:
bcrypt: For hashing passwords.
jsonwebtoken: For generating and verifying JWTs.
script: npm install bcrypt jsonwebtoken
//Discliamer: Waiting for the serializer to be implemented
*/



const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mock User model — replace with real model (e.g., Mongoose or Sequelize)
const User = require('../models/user'); // Adjust path as needed

const SECRET_KEY = "ThisIsNotTheSecretKey";

module.exports = {
  // Register a new user
  register: async (req, res) => {
    const { firstName, lastName, password } = req.body;

    try {
      const existingUser = await User.findOne({ firstName, lastName });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        password: hashedPassword,
      });

      res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
      res.status(500).json({ message: 'Registration failed', error });
    }
  },

  // Login an existing user
  login: async (req, res) => {
    const { firstName, lastName, password } = req.body;

    try {
      const user = await User.findOne({ firstName, lastName });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).json({ message: 'Login failed', error });
    }
  },

  // Logout user
  logout: (req, res) => {
    // You can blacklist JWT or just let it expire
    res.json({ message: 'Logged out (client should discard token)' });
  }
};
