module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define("usuarios", {
        usuario: {
            type: DataTypes.STRING,
            unique: true 
        },
        contraseña: {
            type: DataTypes.STRING,
            unique: true 
        }
    });

    Usuarios.associate = (models) => {
        Usuarios.hasMany(models.ordenCompra);
        Usuarios.hasMany(models.cursos);
    };

    return Usuarios;
};
