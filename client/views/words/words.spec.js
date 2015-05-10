'use strict';

describe('Controller: WordsCtrl', function () {

  beforeEach(module('twitterRecolector'));

  var WordsCtrl;

  beforeEach(inject(function ($controller) {
    WordsCtrl = $controller('WordsCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
