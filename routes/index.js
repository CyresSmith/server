const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const cartRouter = require('./cartRouter');
const productRouter = require('./productRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');

router.use('/user', userRouter);
router.use('/cart', cartRouter);
router.use('/product', productRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);

module.exports = router;
