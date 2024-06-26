const db = require("../models");
const ListadoCursos = db.listadoCursos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body || req.body.length === 0) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const cursos = req.body.map(curso => {
        return {
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            imagen: curso.imagen,
            portada: curso.portada,
            precio: curso.precio
        };
    });

    ListadoCursos.bulkCreate(cursos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send({
                    message: "Uno o más cursos ya existen en la base de datos. Por favor, elija cursos diferentes."
                });
            } else {
                res.status(500).send({
                    message: err.message || "Se produjo un error al crear los cursos."
                });
            }
        });

    
    
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    
    console.log(nombre)
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;


    ListadoCursos.findAll( { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Cursos."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    ListadoCursos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Cursos with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Cursos with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    ListadoCursos.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cursos was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Cursos with id=${id}. Maybe Cursos was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Cursos with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    ListadoCursos.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Cursos was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Cursos with id=${id}. Maybe Cursos was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Cursos with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    ListadoCursos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Cursos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Cursos."
        });
      });
};