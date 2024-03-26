module.exports = (sequelize, DataTypes) => {
    const Cursos = sequelize.define("cursos", {
        nombre: {
            type: DataTypes.STRING,
        },


        descripcion: {
            type: DataTypes.STRING,
        },


        imagen: {
            type: DataTypes.STRING,
        },


        portada: {
            type: DataTypes.STRING,
        },


        valor: {
            type: DataTypes.STRING,
        },

        usuarioId: {
            type: DataTypes.STRING,
        },
    });
    Cursos.associate = (models) => {
        Cursos.hasMany(models.OrdenCompra, {
          foreignKey: "cursoId",
          as: "ordenCompras",
        });
        Cursos.belongsToMany(models.Usuarios, {
          through: "usuario_curso",
          as: "usuarios",
          foreignKey: "cursoId",
        });
      };
    return Cursos;
};