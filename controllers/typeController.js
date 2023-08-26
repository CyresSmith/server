const { Type } = require('../models/models');
const ErrorApi = require('../error/ErrorApi');

class TypeController {
  async create(req, res) {
    const { name } = req.body;

    const type = await Type.create({ name });

    if (!type) ErrorApi(500, 'Something went wrong');

    res.status(200).json(type);
  }

  async getAll(req, res) {
    const types = await Type.findAll();

    if (!types) ErrorApi(500, 'Something went wrong');

    res.status(200).json(types);
  }
}

module.exports = new TypeController();
