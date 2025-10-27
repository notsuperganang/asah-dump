const UsersService = require('../services/UsersService');
const UserValidator = require('../validators/users');

const usersService = new UsersService();

const addUserHandler = async (req, res, next) => {
  try {
    UserValidator.validateUserPayload(req.body);
    const { username, password, fullname } = req.body;

    const userId = await usersService.addUser({ username, password, fullname });

    return res.status(201).json({
      status: 'success',
      data: {
        userId,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addUserHandler,
};
