'use strict';

describe('Controller: SignupCtrl', function () {

  beforeEach(module('twitterRecolector'));

  var SignupCtrl;

  beforeEach(inject(function ($controller) {
    SignupCtrl = $controller('SignupCtrl', {});
  }));

  it('should ...', function () {
    expect(1).toBe(1);
  });

});
