const uuid = require('uuid').v4;
const path = require('path');

const { Product, ProductInfo } = require('../models/models');
const ErrorApi = require('../error/ErrorApi');

class productController {
  async create(req, res) {
    try {
      const { name, price, brandId, typeId, info } = req.body;

      const { img } = req.files;
      const fileName = uuid() + '.jpg';

      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      const product = await Product.create({
        name,
        price,
        brandId,
        typeId,
        img: fileName,
      });

      if (info) {
        info = JSON.parse(info);

        info.forEach(i => {
          ProductInfo.create({
            productId: product.id,
            title: i.title,
            desc: i.desc,
          });
        });
      }

      res.status(200).json(product);
    } catch (e) {
      ErrorApi.internal(e.message);
    }
  }

  async getAll(req, res) {
    const { typeId, brandId, limit = 9, page = 1 } = req.query;

    const offset = page * limit - limit;

    let products;

    if (typeId && !brandId)
      products = await Product.findAndCountAll(
        { where: { typeId } },
        limit,
        offset
      );

    if (!typeId && brandId)
      products = await Product.findAndCountAll(
        { where: { brandId } },
        limit,
        offset
      );

    if (typeId && brandId)
      products = await Product.findAndCountAll(
        {
          where: { typeId, brandId },
        },
        limit,
        offset
      );

    if (!typeId && !brandId)
      products = await Product.findAndCountAll({ limit, offset });

    res.status(200).json(products);
  }

  async getById(req, res) {
    const { id } = req.params;

    const product = Product.findOne({
      where: id,
      include: [{ model: ProductInfo, as: 'info' }],
    });

    res.status(200).json(product);
  }
}

module.exports = new productController();
