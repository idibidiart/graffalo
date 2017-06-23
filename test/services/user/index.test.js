'use strict';

const assert = require('assert');
const app = require('../../../server/app');

describe('user service', function() {
  it('registered the users service', () => {
    assert.ok(app.service('users'));
  });
});
