'use strict';

describe('Controller: AdminblogCtrl', function () {

  // load the controller's module
  beforeEach(module('lotartApp'));

  var AdminblogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminblogCtrl = $controller('AdminblogCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});