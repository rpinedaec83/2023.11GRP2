const Sequelize = require("sequelize");
const dbConfig = require("../config/db.config.js");

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

db.usuarios = require("./usuarios.model.js")(sequelize, Sequelize);
db.cursos = require("./cursos.model.js")(sequelize, Sequelize);
db.ordenCompra = require("./ordenCompra.model.js")(sequelize, Sequelize);
db.cupones = require("./cupon.model.js")(sequelize, Sequelize);

// Asociación entre usuarios y ordenCompra
db.usuarios.hasMany(db.ordenCompra);
db.ordenCompra.belongsTo(db.usuarios);

// Asociación entre cupones y ordenCompra
db.cupones.hasMany(db.ordenCompra);
db.ordenCompra.belongsTo(db.cupones);

// Asociación entre usuarios y cursos
db.usuarios.hasMany(db.cursos);
db.cursos.belongsTo(db.usuarios);


module.exports = db;