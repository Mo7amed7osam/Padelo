const User = require('../models/user.model');
const Court = require('../models/court.model');

exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;
    
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCourtPrice = async (req, res) => {
  try {
    const { courtId } = req.params;
    const { newPrice } = req.body;

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not allowed' });
    }

    const court = await Court.findByIdAndUpdate(
      courtId,
      { price: newPrice },
      { new: true }
    );

    if (!court) {
      return res.status(404).json({ error: 'Court not found' });
    }

    res.status(200).json({
      message: 'Court price updated successfully',
      court
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllUsers = async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const users = await User.find({});
    
    res.status(200).json({
      message: 'Users retrieved successfully',
      users
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
