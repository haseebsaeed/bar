
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};
const { insertDummyData } = require('../init/seed')
const logger = require('../logger')


let sequelize;
sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_ENDPOINT,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  define: {
    underscored: true
  },
  logging: msg => logger.debug(msg)
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync()
  .then(async () => {
    logger.info("Database connected successfully")
    await insertDummyData(db)
  })

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
