const { ordenCompra } = require("../models/index.js");

module.exports = app => {
    const ordenCompra = require("../controllers/ordenCompra.controller.js");
    var router = require("express").Router();

    router.post("/", ordenCompra.create);
    router.get("/", ordenCompra.findAll);
    router.get("/:id", ordenCompra.findOne);
    router.put("/:id", ordenCompra.update);
    router.delete("/:id", ordenCompra.delete);
    router.delete("/", ordenCompra.deleteAll);

    app.use('/api/ordenCompra', router);
};
