const { register, login } = require('../../controllers/authController');

const router = require('express').Router();

// router.post('/register', (req, res, next) => {
//   res.status(201).json({
//     data: req.body,
//   });
// });
router.post('/register', register);
router.post('/login', login);

module.exports = router;
