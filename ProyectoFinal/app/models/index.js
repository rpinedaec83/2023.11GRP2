const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
console.log(dbConfig.USER);
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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


db.cursos = require("./cursos.model.js")(sequelize, Sequelize);

db.usuarios = require("./usuarios.model.js")(sequelize, Sequelize);

db.ordenCompra = require("./ordenCompra.model.js")(sequelize, Sequelize);

db.cupones = require("./cupon.model.js")(sequelize, Sequelize);



 

module.exports = db;