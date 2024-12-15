const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const sendEmail = require('./../email');
const crypto = require('crypto');
const { error } = require('console');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res
        .status(400)
        .send('A valid Email is Required');
    }

    if (!name) {
      return res
        .status(400)
        .send('A valid name is required');
    }

    if (
      !password ||
      !validator.isStrongPassword(password)
    ) {
      return res
        .status(400)
        .send('A strong password is required');
    }

    if (await User.findOne({ email })) {
      return res
        .status(400)
        .send(`This email "${email}" already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    const token = signToken(newUser._id);

    await newUser.save();
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({
      message: 'Error registering user',
      error: error.message,
    });
    console.log(`this error is ${error}`);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send('Email and password are required');
    }

    console.log('Login Request Body:', req.body);

    const user = await User.findOne({ email }).select(
      '+password',
    );
    if (!user) {
      console.log('User not found for email:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    console.log('User retrieved from DB:', user);

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      console.log('Invalid password for user:', email);
      return res
        .status(401)
        .send('Invalid email or password');
    }

    const token = signToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Login Error:', error.message);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
};

exports.addImage = async (req, res) => {
  try {
    const { userId, imageUrl } = req.body;

    if (!validator.isURL(imageUrl)) {
      return res.status(400).send('Invalid image URL');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.image = imageUrl;
    await user.save();
    res
      .status(200)
      .json({ message: 'Image added successfully', user });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

exports.addPhoneNumber = async (req, res) => {
  try {
    const { userId, PhoneNumber } = req.body;

    if (!validator.isMobilePhone(PhoneNumber, 'any')) {
      return res.status(400).send('Invalid phone number');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.PhoneNumber = PhoneNumber;
    await user.save();
    res.status(200).json({
      message: 'PhoneNumber added successfully',
      user,
    });
  } catch (error) {
    res.status(500).send('Server error: ' + error.message);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) {
      return res
        .status(404)
        .json({ message: 'No user found with this email' });
    }

    const resetToken = user.createResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/users/ResetPass/${resetToken}`;

    const message = `Forgot your password? Submit your new password here: ${resetURL}`;

    await sendEmail({
      email: user.email,
      subject:
        'Your Password Reset Link (valid for 10 minutes)',
      text: message,
    });

    return res
      .status(200)
      .json({ message: 'Token sent successfully :)' });
  } catch (err) {
    console.error('Error sending email:', err);

    return res.status(500).json({
      message:
        'There was an error sending the email. Try again later.',
    });
  }
};

exports.ResetPassword = async (req, res) => {
  const hashedtoken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedtoken,
    passwordResetexpires: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({ message: 'Token is invalid or expired' });
  }

  user.password = await bcrypt.hash(req.body.password, 10);

  user.passwordResetToken = undefined;
  user.passwordResetexpires = undefined;
  await user.save();

  const token = signToken(user._id);
  res.status(200).json({ user, token });
};
