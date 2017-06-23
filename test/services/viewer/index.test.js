'use strict';

const assert = require('assert');
const app = require('../../../server/app');

describe('viewer service', function() {
  it('registered the viewers service', () => {
    assert.ok(app.service('viewers'));
  });
});
