const { listadoCursos } = require("../models/index.js");

module.exports = app => {
    const listadoCursos = require("../controllers/listadoCursos.controller.js");
    var router = require("express").Router();

    router.post("/", listadoCursos.create);
    router.get("/", listadoCursos.findAll);
    router.get("/:id", listadoCursos.findOne);
    router.put("/:id", listadoCursos.update);
    router.delete("/:id", listadoCursos.delete);
    router.delete("/", listadoCursos.deleteAll);

    app.use('/api/listadoCursos', router);
};