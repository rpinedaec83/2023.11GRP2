const db = require("../models");
const CarritoCompras = db.carritoCompras;
const Op = db.Sequelize.Op;
const OrdenCompra = db.ordenCompra;
const stripe = require('stripe')('sk_test_51OsBgTJU0Twa6MrrPZo5MqemrrMl3ttkxwxhMrU6lg1SArRu7cRUNPqOUPK9rG0EjL90DHBog9WHtNZSddTKUVfm00JVNyt3CR');



exports.createPaymentIntent = async (req, res) => {
    const {  descripcion, precio, moneda, ordenCompraId } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: precio * 100, // El precio debe estar en centavos
            currency: moneda,
            description: descripcion
        });

        // Actualizar el estado de la orden de compra a 'completado'
        await OrdenCompra.update({ estado: 'completado' }, { where: { id: ordenCompraId } });


        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body.listadocursosId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const carritoCompras = {
        listadocursosId: req.body.listadocursosId,
        usuarioId: req.body.usuarioId,
        cuponId: req.body.cuponId
    };

    CarritoCompras.create(carritoCompras)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Se produjo un error al crear el carrito de compras."
            });
        });
};
exports.findAll = (req, res) => {
    const nombre = req.query.nombre;
    
    console.log(nombre)
    var condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;



    
    CarritoCompras.findAll({
        include: ["usuarios","cupon","listadoCursos"],

       
    }, { where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving carrito de compras."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;

    CarritoCompras.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find carrito de compras with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving carrito de compras with id=" + id
            });
        });
};
exports.update = (req, res) => {
    const id = req.params.id;

    CarritoCompras.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "carrito de compras was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update carrito de compras with id=${id}. Maybe carrito de compras was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating carrito de compras with id=" + id
            });
        });
};
exports.delete = (req, res) => {
    const id = req.params.id;

    CarritoCompras.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "carrito de compras was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete carrito de compras with id=${id}. Maybe carrito de compras was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete carrito de compras with id=" + id
            });
        });
};
exports.deleteAll = (req, res) => {
    CarritoCompras.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} carrito de compras were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all carrito de compras."
        });
      });
};