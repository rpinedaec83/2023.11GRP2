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
        Cursos.belongsTo(models.usuarios);
    };

    return Cursos;
};
