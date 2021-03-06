const express = require('express');
const router = express.Router();

const response_template = {
  error: false,
  code: 200,
  message: ''
};

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let response = { ...response_template, message: 'Ok' };
  res.send(response);
});

// router.get('/qwerty', function(req, res, next) {
//   res.send('qwerty');
// });

// router.get('/zaq', function(req, res, next) {
//   res.send('zaq');
// });

// router.post('/hi', function (req, res) {
//   res.send('[POST]Saludos desde express');
// });

router.post('/mirror', function (req, res) {
  let response = {};

  if(!req.body.content) {
    response = {
      ...response_template,
      error: true,
      code: 502,
      message: 'Field required'
    };
  } else {
    let input = {
      content: req.body.content
    };

    response = {
      ...response_template,
      message: 'Field Got It',
      input: input
    };
  }

  res.send(response);
});

module.exports = router;


