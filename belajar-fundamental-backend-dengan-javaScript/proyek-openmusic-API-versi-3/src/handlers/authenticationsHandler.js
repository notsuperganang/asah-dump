const AuthenticationsService = require('../services/AuthenticationsService');
const UsersService = require('../services/UsersService');
const TokenManager = require('../tokenize/TokenManager');
const AuthenticationsValidator = require('../validators/authentications');

const authenticationsService = new AuthenticationsService();
const usersService = new UsersService();

const postAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePostAuthenticationPayload(req.body);
    const { username, password } = req.body;

    const userId = await usersService.verifyUserCredential(username, password);

    const accessToken = TokenManager.generateAccessToken({ userId });
    const refreshToken = TokenManager.generateRefreshToken({ userId });

    await authenticationsService.addRefreshToken(refreshToken, userId);

    return res.status(201).json({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const putAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validatePutAuthenticationPayload(req.body);
    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);
    const { userId } = TokenManager.verifyRefreshToken(refreshToken);

    const accessToken = TokenManager.generateAccessToken({ userId });

    return res.status(200).json({
      status: 'success',
      data: {
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

const deleteAuthenticationHandler = async (req, res, next) => {
  try {
    AuthenticationsValidator.validateDeleteAuthenticationPayload(req.body);
    const { refreshToken } = req.body;

    await authenticationsService.verifyRefreshToken(refreshToken);
    await authenticationsService.deleteRefreshToken(refreshToken);

    return res.status(200).json({
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postAuthenticationHandler,
  putAuthenticationHandler,
  deleteAuthenticationHandler,
};
