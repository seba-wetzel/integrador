const { Router } = require('express')
const productsRoute = require('./products')
const router = Router()

router.use("/productos", productsRoute);

module.exports = router;