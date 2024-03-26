module.exports = (sequelize, Sequelize) => {
    const Usuarios = sequelize.define("usuarios", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      usuario: {
        type: Sequelize.STRING
      },
      contraseña: {
        type: Sequelize.STRING
      },
    });
  
    return Usuarios;
  };