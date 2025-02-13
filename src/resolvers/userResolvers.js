const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const { body, validationResult } = require('express-validator');


const userResolvers = {
  Mutation: {
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error('Invalid credentials');
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        });

        return token; 
      } catch (error) {
        throw new Error(error.message);
      }
    },

    signup: async (_, { username, email, password }) => {
      try {
        // Manually validate input
        const errors = [];

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          errors.push('Email must be valid');
        }

        if (!username || username.trim() === '') {
          errors.push('Username is required');
        }

        if (!password || password.length < 6) {
          errors.push('Password must be at least 6 characters long');
        }

        if (errors.length > 0) {
          throw new Error(errors.join(', '));
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
          throw new Error('User already exists');
        }

        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });

        await newUser.save();

        return 'User created successfully';
      } catch (error) {
        console.error("Error during signup:", error.message);
        throw new Error("Error creating user. Please try again.");
      }
    },
  },
};

module.exports = userResolvers;
