const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');
const ApiError = require('../utils/apiError');

//create jwt token
const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.register = async (req, res, next) => {
  try {
    //check if user exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return next(new ApiError('user already registered', 400));
    }
    // const user = await User.create(req.body);
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      fullname: req.body.fullname,
      email: req.body.email,
      password: hashedPassword,
    });

    await user.save();

    user.password = undefined;
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
      return next(new ApiError('user does not exist', 400));
    }

    //compare user password
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password,
    );

    //if password not correct
    if (!correctPassword) {
      return next(new ApiError('invalid information try again', 400));
    }

    user.password = undefined;

    const token = signToken(user._id);

    res.status(200).json({
      status: 'success',
      data: user,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.authorize = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    console.log(token);
    if (!token) {
      return next(new ApiError('please login to view this resource', 401));
    }

    let decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById({ _id: decoded.id });

    if (!currentUser) {
      return next(new ApiError('user does not exist', 401));
    }

    req.user = currentUser;
    return next();
  } catch (error) {
    return next(error);
  }
};

exports.roles = (...roles) => {
  return (req, res, next) => {
    console.log(roles);
    if (roles.includes(req.user.role)) {
      return next(new ApiError('forbidden', 403));
    }
    return next();
  };
};
