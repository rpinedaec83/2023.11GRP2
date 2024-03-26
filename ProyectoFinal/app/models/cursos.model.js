module.exports = (sequelize, Sequelize) => {
    const Cursos = sequelize.define("cursos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombre: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.FLOAT
      }
    });
  
    return Cursos;
  };
  ``