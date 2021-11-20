const router = require('express').Router();

router.get('/view-all', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'data fetched',
    data: {},
  });
});

router.get('/view/:id/:name', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'data fetched',
    data: req.params,
  });
});

router.post('/create', (req, res, next) => {
  res.status(201).json({
    status: 'success',
    message: 'new post created',
    data: req.body,
  });
});

router.patch('/update/:id', (req, res, next) => {
  res.status(201).json({
    status: 'success',
    message: 'post is updated',
    data: req.body,
  });
});

router.delete('/delete/:id', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'data is deleted',
    data: {},
  });
});

module.exports = router;
