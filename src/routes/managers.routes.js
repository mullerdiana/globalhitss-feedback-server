const express = require("express");
const managersRoutes = express.Router();

const managersController = require("../controllers/managers");

managersRoutes.post("/cadastrar", managersController.Create);
managersRoutes.get("/todos", managersController.SearchAll);
managersRoutes.get("/gestor/:id", managersController.SearchOne);
managersRoutes.get("/search", managersController.Search);
managersRoutes.delete("/deletar/:id", managersController.Delete);
managersRoutes.put("/editar/:id", managersController.Update);

module.exports = managersRoutes;
