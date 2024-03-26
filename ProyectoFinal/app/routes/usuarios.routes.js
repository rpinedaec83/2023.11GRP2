const { usuarios } = require("../models/index.js");

module.exports = app => {
    const usuarios = require("../controllers/usuarios.controller.js");
    var router = require("express").Router();

    router.post("/", usuarios.create);
    router.get("/", usuarios.findAll);
    router.get("/:id", usuarios.findOne);
    router.put("/:id", usuarios.update);
    router.delete("/:id", usuarios.delete);
    router.delete("/", usuarios.deleteAll);

    app.use('/api/usuarios', router);
};