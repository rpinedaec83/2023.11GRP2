module.exports = (sequelize, DataTypes) => {
    const CarritoCompras = sequelize.define("carritoCompras", {
        
        listadocursosId: {
            type: DataTypes.INTEGER, //
        },

        usuarioId: {
            type: DataTypes.INTEGER, //
        },
        cuponId: {
            type: DataTypes.INTEGER, // 
        },
    });
    return CarritoCompras;
};
