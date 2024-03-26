module.exports = (sequelize, DataTypes) => {
    const Cupon = sequelize.define("cupon", {
        diversoscupones: {
            type: DataTypes.STRING,
            
       
        },
    

    });
    Cupon.associate = (models) => {
        Cupon.belongsTo(models.OrdenCompra, {
          foreignKey: "ordenCompraId",
          as: "ordenCompra",
        });
      };
    return Cupon;
};