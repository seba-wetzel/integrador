const { Router } = require("express");
const categoriessRoute = Router();
const { Categorie } = require("../models")


categoriessRoute.post("/", (req, res, next) => {
    const name = req.body.name;
    console.log(name)
    Categorie.create({ name }).then((categorie) => res.sendStatus(200).json(categorie).end())
})

module.exports = categoriessRoute;