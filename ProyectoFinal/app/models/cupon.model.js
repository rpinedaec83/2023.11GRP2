module.exports = (sequelize, DataTypes) => {
    const Cupon = sequelize.define("cupon", {
        diversoscupones: {
            type: DataTypes.STRING,
            
       
        },
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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