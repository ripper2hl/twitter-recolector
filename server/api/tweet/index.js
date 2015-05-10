'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./tweet.controller');
//controller.recolect();
router.get('/', controller.index);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.delete('/:id', controller.destroy);
module.exports = router;
