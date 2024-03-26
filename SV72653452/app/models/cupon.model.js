module.exports = (sequelize, DataTypes) => {
    const Cupon = sequelize.define("cupon", {
        diversoscupones: {
            type: DataTypes.STRING,
            
       
        },


    });
    return Cupon;
};