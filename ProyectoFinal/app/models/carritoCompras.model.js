module.exports = (sequelize, DataTypes) => {
    const CarritoCompras = sequelize.define("carritoCompras", {
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
        precio: {
            type: DataTypes.STRING, // FLOAT O DOUBLE
        },
        usuarioId: {
            type: DataTypes.INTEGER, //
        },
        cuponId: {
            type: DataTypes.INTEGER, // STRING
        },
    });
    return CarritoCompras;
};
