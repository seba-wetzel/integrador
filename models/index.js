const db = require("./db")
const Product = require("./product")
const Categorie = require("./categorie")

Product.belongsToMany(Categorie, { through: 'ProductCategories' });
Categorie.belongsToMany(Product, { through: 'ProductCategories' });

module.exports = {
    Product,
    Categorie,
    db
}