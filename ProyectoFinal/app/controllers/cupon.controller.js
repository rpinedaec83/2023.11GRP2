const db = require("../models");
const Cupon = db.cupones;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.diversoscupones) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const cupones = {
        diversoscupones: req.body.diversoscupones,
         
    };

    
    Cupon.create(cupones)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                res.status(400).send({
                    message: "cupones ya existen en la base de datos. Por favor, elija diferentes."
                });
            } else {
                res.status(500).send({
                    message: err.message || "Se produjo un error al crear cupones."
                });
            }
        });
};
exports.findAll = (req, res) => {
    const diversoscupones = req.query.diversoscupones;
    
    console.log(diversoscupones)
    var condition = diversoscupones ? { diversoscupones: { [Op.like]: `%${diversoscupones}%` } } : null;


    Cupon.findAll( { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving cupones."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cupon.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find cupones with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving cupones with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    Cupon.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "cupones was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update cupones with id=${id}. Maybe cupones was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating cupones with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    Cupon.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "cupones was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete cupones with id=${id}. Maybe cupones was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete cupones with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    Cupon.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} cupones were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all cupones."
        });
      });
};