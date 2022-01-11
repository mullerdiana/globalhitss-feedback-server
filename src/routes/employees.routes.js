const express = require("express");
const employeesRoutes = express.Router();

const employeesController = require("../controllers/employees");
const authentication = require("../middleware/auth");

employeesRoutes.post(
	"/cadastrar",
	authentication.auth,
	employeesController.Create
);
employeesRoutes.get("/todos", employeesController.SearchAll);
employeesRoutes.get("/colaborador/:id", employeesController.SearchOne);
employeesRoutes.get("/search", employeesController.Search);
employeesRoutes.delete("/deletar/:id", employeesController.Delete);
employeesRoutes.put("/editar/:id", employeesController.Update);
employeesRoutes.patch("/editarTime/:id", employeesController.UpdateTeam);

module.exports = employeesRoutes;
