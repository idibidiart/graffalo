'use strict';

const assert = require('assert');
const app = require('../../../server/app');

describe('graphql service', function() {
  it('registered the graphqls service', () => {
    assert.ok(app.service('graphqls'));
  });
});
