const { expect } = require('chai');

const authMiddleware = require('../middleware/is-auth');

it('should throw an error if no Authorization header is present', () => {
  const req = {
    get(headerName) {
      return null;
    }
  };

  expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not Authenticated.');
});
