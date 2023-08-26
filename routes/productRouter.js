const Router = require('express');

const productController = require('../controllers/productController');
const checkRoleMiddleware = require('../middleware/checkRoleMiddleware');

const router = new Router();

router.post('/', checkRoleMiddleware('ADMIN'), productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

module.exports = router;
