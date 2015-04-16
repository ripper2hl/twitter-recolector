'use strict';

/**
 * Documentation tasks
 */

var gulp    = require('gulp');
var sassdoc = require('sassdoc');

exports.sassdoc = function () {
  gulp.src('client/styles/**/*.scss')
    .pipe(sassdoc({
      dest: 'docs/sass'
    }));
};
