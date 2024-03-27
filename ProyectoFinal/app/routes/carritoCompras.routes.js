const { carritoCompras } = require("../models/index.js");
const carritoComprasController = require("../controllers/carritoCompras.controller.js");


module.exports = app => {
    const carritoCompras = require("../controllers/carritoCompras.controller.js");
    var router = require("express").Router();

    router.post("/", carritoCompras.create);
    router.get("/", carritoCompras.findAll);
    router.get("/:id", carritoCompras.findOne);
    router.put("/:id", carritoCompras.update);
    router.delete("/:id", carritoCompras.delete);
    router.delete("/", carritoCompras.deleteAll);

    router.post("/paymentIntent", carritoComprasController.createPaymentIntent);
    

    app.use('/api/carritoCompras', router);
};
