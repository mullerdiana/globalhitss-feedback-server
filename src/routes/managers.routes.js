const express = require("express");
const managersRoutes = express.Router();

const managersController = require("../controllers/managers");

managersRoutes.post("/create", managersController.Create);
managersRoutes.get("/all", managersController.SearchAll);
managersRoutes.get("/manager/:id", managersController.SearchOne);
managersRoutes.get("/search", managersController.Search);
managersRoutes.delete("/delete/:id", managersController.Delete);
managersRoutes.put("/edit/:id", managersController.Update);

module.exports = managersRoutes;
