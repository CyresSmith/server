const ErrorApi = require('../error/ErrorApi');

class UserController {
  async register(req, res) {}
  async login(req, res) {}
  async authCheck(req, res, next) {
    const { id } = req.query;

    if (!id) {
      return next(ErrorApi.badRequest('Id is nod defined'));
    }

    res.status(200).json({ message: `ID is "${id}"` });
  }
}

module.exports = new UserController();
