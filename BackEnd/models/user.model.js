const mongoose = require('mongoose');
const crypto = require('crypto');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    image: {
      type: String,
      default: 'https://www.viverefermo.it/images/user.png',
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    passwordResetToken: String,
    passwordResetexpires: Date,
  },
  { timestamps: true },
);

userSchema.pre('save', function (next) {
  if (!this.isModified('passed') || this.isNew)
    return next();
  this.password.isModified = Date.now() - 1000;
});

userSchema.methods.createResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetexpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
module.exports = mongoose.model('User', userSchema);
