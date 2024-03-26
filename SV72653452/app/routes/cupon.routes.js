const { cupones } = require("../models/index.js");

module.exports = app => {
    const cupones = require("../controllers/cupon.controller.js");
    var router = require("express").Router();

    router.post("/", cupones.create);
    router.get("/", cupones.findAll);
    router.get("/:id", cupones.findOne);
    router.put("/:id", cupones.update);
    router.delete("/:id", cupones.delete);
    router.delete("/", cupones.deleteAll);

    app.use('/api/cupones', router);
};