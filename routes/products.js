const { Router } = require("express");
const productsRoute = Router();
const { Product } = require("../models")

// GET /productos
// GET /productos/:id
// POST /productos
// PUT /productos/:id
// DELETE /productos/:id

productsRoute.get("/", (req, res, next) => {
    if (req.query.stock) {
        Product.stockLess().then((results) => { res.json(results).end() })

    }
    else {
        Product.findAll()
            .then((productos) => res.json(productos))
    }

});

productsRoute.get("/:id", (req, res, next) => {
    const id = req.params.id;

    Product.findByPk(id).then((producto) => {
        res.json(producto.profits())

    })
        .catch((err) => res.status(404).json(err).end())
});

productsRoute.post("/", (req, res, next) => {
    const { nombre, precio, descripcion, stock } = req.body;
    Product.create({
        nombre,
        precio,
        descripcion,
        stock
    }).then((producto) => res.status(200).json(producto))
        .catch((err) => {
            console.log(err)
            res.sendStatus(503).end()
        })
});

productsRoute.put("/:id", (req, res, next) => {

});

productsRoute.delete("/:id", (req, res, next) => {

});

module.exports = productsRoute;