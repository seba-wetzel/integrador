const { Router } = require("express");
const productsRoute = Router();
const { Product, Categorie } = require("../models")
const { Op } = require('sequelize')

// GET /productos
// GET /productos/:id
// POST /productos
// PUT /productos/:id
// DELETE /productos/:id

productsRoute.get("/", (req, res, next) => {
    const query = req.query.categoria
    //Product.stockLess().then((results) => { res.json(results).end() })
    Product.findAll({
        where: { '$categories.nombre$': { [Op.eq]: query } },
        include: [{
            model: Categorie,
            as: "categories",
            required: true,
            attributes: ['nombre', 'id'],
            // through:
            //     { attributes: [] }
        }]
    }).then(productos => res.json(productos))
});

productsRoute.get("/:id", (req, res, next) => {
    const id = req.params.id;

    Product.findByPk(id).then((producto) => {
        res.json(producto.profits())

    })
        .catch((err) => res.status(404).json(err).end())
});

productsRoute.post("/", async (req, res, next) => {
    const { nombre, precio, descripcion, disponible, stock, categorias } = req.body;
    let categories = [...categorias.split(",")]

    const product = await Product.create({
        nombre,
        precio,
        descripcion,
        disponible,
        stock
    })


    Promise.all(categories.map(async categoria => await Categorie.findOrCreate({ where: { nombre: categoria } })))
        .then(async arr => {
            await product.addCategories(arr.map(array => array[0]))
            res.status(200).json(product)
        })
})


productsRoute.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const { nombre, precio, descripcion, disponible, stock } = req.body;

    const [num, productRows] = await Product.update({ nombre, precio, descripcion, disponible, stock }, {
        where: {
            id
        }, returning: true,
        plain: true,
    })
    res.json(productRows);

});

productsRoute.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    product.destroy();
    res.json(product);

});

productsRoute.delete("/:id/:category", async (req, res, next) => {
    const { id, category } = req.params
    const product = await Product.findByPk(id);
    const categories = await product.getCategories({ where: { 'nombre': category } });
    const remove = await product.removeCategories(categories);
    console.log(remove)
    res.json(categories);
});

module.exports = productsRoute;