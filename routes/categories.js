const { Router } = require("express");
const categoriessRoute = Router();
const { Categorie } = require("../models")


categoriessRoute.post("/", (req, res, next) => {
    const nombre = req.body.nombre;
    Categorie.create({ nombre }).then((categorie) => res.sendStatus(200).json(categorie).end())
})

module.exports = categoriessRoute;