const express = require('express');
const router = express.Router();

const response_template = {
  error: false,
  code: 200,
  message: ''
};

router.get('/', function(req, res, next) {
  let response = { ...response_template, message: 'Ok' };
  res.send(response);
});

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


