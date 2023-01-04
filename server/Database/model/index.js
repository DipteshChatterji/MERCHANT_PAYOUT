const dbConfig = require("../config/config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.details = require("./details.model")(sequelize, Sequelize);
db.transaction = require("./transaction.model.js")(sequelize, Sequelize);
db.final = require("./final.model")(sequelize, Sequelize);

db.details.hasMany(db.transaction,{
  foreignKey:"customer_id"
});
db.transaction.hasMany(db.details,{
  foreignKey:"merchant_id"
})
db.details.hasMany(db.final,{
  foreignKey:"merchant_id"
});
db.final.hasMany(db.details,{
  foreignKey:"merchant_id"
})

module.exports = db;