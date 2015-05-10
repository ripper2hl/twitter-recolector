'use strict';

var _ = require('lodash');
var Word = require('./word.model');

function handleError (res, err) {
  return res.status(500).send(err);
}

/**
 * Get list of Word
 *
 * @param req
 * @param res
 */
exports.index = function (req, res) {
  Word.find(function (err, words) {
    if (err) { return handleError(res, err); }
    return res.status(200).json(words);
  });
};

/**
 * Get a single Word
 *
 * @param req
 * @param res
 */
exports.show = function (req, res) {
  Word.findById(req.params.id, function (err, word) {
    if (err) { return handleError(res, err); }
    if (!word) { return res.status(404).end(); }
    return res.status(200).json(word);
  });
};

/**
 * Creates a new Word in the DB.
 *
 * @param req
 * @param res
 */
exports.create = function (req, res) {
  Word.create(req.body, function (err, word) {
    if (err) { return handleError(res, err); }
    return res.status(201).json(word);
  });
};

/**
 * Updates an existing Word in the DB.
 *
 * @param req
 * @param res
 */
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Word.findById(req.params.id, function (err, word) {
    if (err) { return handleError(res, err); }
    if (!word) { return res.status(404).end(); }
    var updated = _.merge(word, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(word);
    });
  });
};

/**
 * Deletes a Word from the DB.
 *
 * @param req
 * @param res
 */
exports.destroy = function (req, res) {
  Word.findById(req.params.id, function (err, word) {
    if (err) { return handleError(res, err); }
    if (!word) { return res.status(404).end(); }
    word.remove(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(204).end();
    });
  });
};
