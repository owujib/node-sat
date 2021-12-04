const User = require('../models/User');

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (error) {
    return next(error);
  }
};
