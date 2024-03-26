module.exports = (sequelize, DataTypes) => {
    const Usuarios = sequelize.define("usuarios", {
        usuario: {
            type: DataTypes.STRING,
            unique: true 
       
        },


        contraseña: {
            type: DataTypes.STRING,
            unique: true 
       
        },
    

        
    });
    Usuarios.associate = (models) => {
        Usuarios.hasMany(models.OrdenCompra, {
          foreignKey: "usuarioId",
          as: "ordenCompras",
        });
      };
    return Usuarios;
};