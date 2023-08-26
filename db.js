const { Sequelize } = require('sequelize');
require('dotenv').config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
});
