const { Router } = require('express');
const categoriessRoute = require('./categories');
const productsRoute = require('./products')
const router = Router()

router.use("/productos", productsRoute);
router.use("/categorias", categoriessRoute);

module.exports = router;