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

// Define la relación entre usuarios y cursos (muchos a muchos)
db.cursos.associate = function(models) {
  db.cursos.belongsToMany(db.usuarios, {
    through: "usuario_curso",
    foreignKey: "cursoId",
    otherKey: "usuarioId",
    as: "usuarios"
  });
};

// Define la relación entre usuarios y ordenCompra (uno a muchos)
db.usuarios.associate = function(models) {
  db.usuarios.hasMany(db.ordenCompra, {
    foreignKey: "usuarioId",
    as: "ordenesCompra"
  });
};

// Define la relación entre ordenCompra y cupones (uno a muchos)
db.ordenCompra.associate = function(models) {
  db.ordenCompra.hasMany(db.cupones, {
    foreignKey: "ordenCompraId",
    as: "cupones"
  });
};

db.sequelize.sync();

module.exports = db;