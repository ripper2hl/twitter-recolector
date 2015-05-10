'use strict';

describe('words route', function () {

  beforeEach(function () {
    browser.get('/words');
  });

  it('should have a basic content', function () {
    expect(element.all(by.css('div')).first().getText()).toBe('WordsCtrl');
  });

});
