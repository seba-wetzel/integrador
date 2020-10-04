const { Router } = require("express");
const productsRoute = Router();
const Product = require("../models")

// GET /productos
// GET /productos/:id
// POST /productos
// PUT /productos/:id
// DELETE /productos/:id

productsRoute.get("/", (req, res, next) => {
    res.send("estamos en productos")

});
productsRoute.get("/:id", (req, res, next) => {

});
productsRoute.post("/", (req, res, next) => {

});
productsRoute.put("/:id", (req, res, next) => {

});
productsRoute.delete("/:id", (req, res, next) => {

});

module.exports = productsRoute;