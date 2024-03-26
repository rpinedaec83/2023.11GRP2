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
    OrdenCompra.associate = (models) => {
        OrdenCompra.belongsTo(models.Cursos, {
          foreignKey: "cursoId",
          as: "curso",
        });
        OrdenCompra.belongsTo(models.Usuarios, {
          foreignKey: "usuarioId",
          as: "usuario",
        });
        OrdenCompra.hasMany(models.Cupones, {
          foreignKey: "ordenCompraId",
          as: "cupones",
        });
      };
    
    return OrdenCompra;
};
