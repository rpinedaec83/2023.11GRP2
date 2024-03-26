module.exports = (sequelize, DataTypes) => {
    const OrdenCompra = sequelize.define("ordenCompra", {
        fecha: {
            type: DataTypes.STRING,
        },
        estado: {
            type: DataTypes.STRING,
        },
        impuestos: {
            type: DataTypes.STRING,
        }
    });

    OrdenCompra.associate = (models) => {
        OrdenCompra.belongsTo(models.usuarios);
        OrdenCompra.belongsTo(models.cupones);
    };

    return OrdenCompra;
};
