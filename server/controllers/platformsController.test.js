const Platform = require('../../database/models/platform');
const { getPlatforms, addPlatform, updatePlatform } = require('./platformsController');

jest.mock('../../database/models/platform');

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const platformsArray = [
  { name: 'netflix', id: '12345' },
  { name: 'vomistar', id: '54321' },
];

describe('Given a getPlatforms function', () => {
  describe("When it's invoked with response and it goes well", () => {
    test('Then it should return the robots ', async () => {
      const res = mockResponse();
      const platforms = platformsArray;
      const next = jest.fn();
      Platform.find = jest.fn().mockResolvedValue(platforms);

      await getPlatforms(null, res, next);

      expect(Platform.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(platforms);
    });
  });
  describe("When it's invoked with response and something fail", () => {
    test('Then it should invoke next with the error object', async () => {
      const res = mockResponse();
      const next = jest.fn();
      const error = new Error();
      error.code = 400;
      error.message = 'Cannot get platforms';
      Platform.find = jest.fn().mockRejectedValue(new Error());

      await getPlatforms(null, res, next);

      expect(Platform.find).toHaveBeenCalled();
      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe('Given a addPlatform function', () => {
  describe("When it's invoked with a req.body including a platform", () => {
    test('Then it should return the new platform in res.json', async () => {
      const res = mockResponse();
      const platform = {
        id: '6185a755cee735ee214bc98c',
        name: 'platformrandom',
      };
      const req = { body: platform };
      Platform.create = jest.fn().mockResolvedValue(platform);

      await addPlatform(req, res, null);

      expect(Platform.create).toHaveBeenCalledWith(platform);
      expect(res.json).toHaveBeenCalledWith(platform);
    });
  });
  describe("When it's invoked without right platform", () => {
    test('Then it should invoke next with an error', async () => {
      const req = { body: 'whatever' };
      const error = new Error();
      error.code = 400;
      error.message = 'Cannot create the platform';

      const next = jest.fn();
      Platform.create = jest.fn().mockRejectedValue(new Error());

      await addPlatform(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
