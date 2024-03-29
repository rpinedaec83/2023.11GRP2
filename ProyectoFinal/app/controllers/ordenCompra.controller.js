const db = require("../models");
const OrdenCompra = db.ordenCompra;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    // Validate request
    if (!req.body.fecha) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const ordenCompra = {
        fecha: req.body.fecha,
        estado: "pendiente", // estado en pendiente inicialmente
        usuarioId: req.body.usuarioId,
        cuponId: req.body.cuponId,
        carritoCompraId: req.body.carritoCompraId
    };
    OrdenCompra.create(ordenCompra)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the order."
            });
        });
};


exports.findAll = (req, res) => {
    const fecha = req.query.fecha;
   
    var condition = fecha ? { fecha: { [Op.like]: `%${fecha}%` } } : null;

    OrdenCompra.findAll({
        include: ["usuarios","cupon", "carritoCompras"],

       
    }, { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ordenCompra."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    OrdenCompra.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find ordenCompra with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving ordenCompra with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    OrdenCompra.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ordenCompra was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update ordenCompra with id=${id}. Maybe ordenCompra was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating ordenCompra with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    OrdenCompra.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "ordenCompra was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete ordenCompra with id=${id}. Maybe ordenCompra was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete ordenCompra with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    OrdenCompra.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} ordenCompra were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all ordenCompra."
        });
      });
};