const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require("./db")

class Categorie extends Model { }

Categorie.init({
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: 'categorie' // We need to choose the model name
});

module.exports = Categorie;