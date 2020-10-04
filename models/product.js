const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require("./db")

class Product extends Model { }

Product.init({
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.TEXT
    },
    disponible: {
        type: DataTypes.BOOLEAN
    },
    stock: {
        type: DataTypes.INTEGER
    }
}, {
    // Other model options go here
    sequelize: db, // We need to pass the connection instance
    modelName: 'Product' // We need to choose the model name
});