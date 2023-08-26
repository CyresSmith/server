const { Brand } = require('../models/models');
const ErrorApi = require('../error/ErrorApi');

class BrandController {
  async create(req, res) {
    const { name } = req.body;

    const brand = await Brand.create({ name });

    if (!brand) ErrorApi(500, 'Something went wrong');

    res.status(200).json(brand);
  }

  async getAll(req, res) {
    const brands = await Brand.findAll();

    if (!brands) ErrorApi(500, 'Something went wrong');

    res.status(200).json(brands);
  }
}

module.exports = new BrandController();
