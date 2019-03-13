const { expect } = require('chai');

const authMiddleware = require('../middleware/is-auth');

describe('Auth middleware', () => {
  it('should throw an error if no Authorization header is present', () => {
    const req = {
      get(headerName) {
        return null;
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not Authenticated.');
  });

  it('should throw an error if Authorization header is only one string', () => {
    const req = {
      get(headerName) {
        return 'xyz';
      }
    };

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });
});
