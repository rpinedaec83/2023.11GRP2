module.exports = (sequelize, DataTypes) => {
    const Cupon = sequelize.define("cupon", {
        diversoscupones: {
            type: DataTypes.STRING,
        },
    });

    Cupon.associate = (models) => {
        Cupon.hasMany(models.ordenCompra);
    };

    return Cupon;
};
