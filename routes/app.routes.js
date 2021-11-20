const router = require('express').Router();

//home route '/'
router.get('/', (req, res, next) => {
  res.render('index.ejs', {
    title: 'Home - Welcome',
  });
});

//contact us
router.get('/contact-us', (req, res, next) => {
  res.render('contact-us');
});

router.post('/contact-form', (req, res, next) => {
  console.log({ email: req.body.email, password: req.body.password });
  res.send(req.body);
});
// /api
router.get('/api', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'record fetched',
    data: {
      name: 'Express api v1',
      author: 'Favour',
    },
  });
});

module.exports = router;
