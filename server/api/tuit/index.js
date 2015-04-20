'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./tuit.controller');

router.get('/',  controller.getAll);
router.post('/',  controller.createTuit);

router.get('/:id',  controller.getTuitById);

module.exports = router;
