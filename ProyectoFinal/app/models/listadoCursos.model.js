module.exports = (sequelize, DataTypes) => {
    const ListadoCursos = sequelize.define("listadoCursos", {
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
        }
        
    });
    return ListadoCursos;
};
