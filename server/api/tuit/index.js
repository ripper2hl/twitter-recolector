'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./tuit.controller');

router.get('/',  controller.getTuit);

module.exports = router;
