const db = require("../models");
const Cursos = db.cursos;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cursos = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        portada: req.body.portada,
        valor: req.body.valor,
        usuarioId: req.body.usuarioId
    };

    
    Cursos.create(cursos)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the sexo."
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    
    console.log(nombre)
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;



    
    Cursos.findAll({
        include: ["usuarios"],

       
    }, { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cursos.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find sexo with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving sexo with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Cursos.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "sexo was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update sexo with id=${id}. Maybe sexo was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating sexo with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Cursos.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "sexo was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete sexo with id=${id}. Maybe sexo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete sexo with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    Cursos.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} sexos were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all sexos."
        });
      });
};