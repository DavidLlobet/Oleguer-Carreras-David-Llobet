const { notFoundErrorHandler, generalErrorHandler } = require('./error');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('Given a notFoundErrorHandler', () => {
  describe("When it's invoked", () => {
    test('Then it should response with an error', () => {
      const res = mockResponse();

      notFoundErrorHandler(null, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Endpoint not found' });
    });
  });
});

describe('Given a generalErrorHandler', () => {
  describe('When it receives an object error with a code and a message', () => {
    test('Then it should invoke the method status with a code and json with a message', () => {
      const res = mockResponse();
      const error = { code: 600, message: 'Fatality' };

      generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(error.code);
      expect(res.json).toHaveBeenCalledWith({ error: error.message });
    });
  });
  describe('When it receives an empty object error and an object res', () => {
    test('Then it should invoke the method status with a code and json with a message', () => {
      const res = mockResponse();
      const error = {};

      generalErrorHandler(error, null, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Fatal error' });
    });
  });
});
