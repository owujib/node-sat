const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    // const user = await User.create(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();
    return res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    //check if user exists
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new Error('user does not exist'));
    }

    //compare user password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    //if password not correct
    if (!correctPassword) {
      return next(new Error('invalid information try again'));
    }

    user.password = undefined;

    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
