const { Sequelize } = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/integrador', {
    dialect: "postgres",
    logging: false
});

module.exports = db;