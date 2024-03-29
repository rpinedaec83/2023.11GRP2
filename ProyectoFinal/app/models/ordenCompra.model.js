module.exports = (sequelize, DataTypes) => {
    const OrdenCompra = sequelize.define("ordenCompra", {
       

        
        estado: {
            type: DataTypes.STRING,
            
        },
        
        usuarioId: {
            type: DataTypes.INTEGER,
            
        },

        cuponId: {
            type: DataTypes.INTEGER,
            
        },
        
        carritoCompraId: {
            type: DataTypes.INTEGER,
        }

        
    });

    

    return OrdenCompra;
};
