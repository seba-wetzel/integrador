const { Sequelize, DataTypes, Model } = require('sequelize');
const db = require("./db")

class Product extends Model { }

Product.init({
    // Model attributes are defined here
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        // get() {
        //     console.log(this.getDataValue(this.disponible))
        //     const nombre = this.getDataValue('nombre')
        //     return (this.getDataValue(this.disponible)) ? nombre : nombre + ' NO DISPONIBLE'

        // }
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        get: function () {
            return '$' + this.getDataValue('precio')
        }
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
    modelName: 'product' // We need to choose the model name
});

Product.stockLess = () => {
    return Product.findAll(
        {
            where: {
                [Op.or]: [{ stock: 0 }, { disponible: false }]
            }
        }
    )
};

// Product.addHook('beforeCreate', product => {
//     product.nombre = (product.disponible) ? product.nombre : product.nombre + ' NO DISPONIBLE';
// });

Product.prototype.profits = function () {
    return this.stock * this.getDataValue('precio');
}

module.exports = Product;