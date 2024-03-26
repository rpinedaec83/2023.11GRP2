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
            
        },
        
        usuarioId: {
            type: DataTypes.STRING,
            
        },

        cuponId: {
            type: DataTypes.STRING,
            
        },
       
    });
    return OrdenCompra;
};
