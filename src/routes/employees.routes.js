const express = require("express");
const employeesRoutes = express.Router();

const employeesController = require("../controllers/employees");

employeesRoutes.post("/cadastrar", employeesController.Create);
employeesRoutes.get("/todos", employeesController.SearchAll);
employeesRoutes.get("/colaborador/:id", employeesController.SearchOne);
employeesRoutes.get("/search", employeesController.Search);
employeesRoutes.get("/get-by-manager", employeesController.GetByManager);
employeesRoutes.get("/get-by-manager-and-team", employeesController.GetByManagerAndTeam);
employeesRoutes.get("/get-by-manager-and-team-null", employeesController.GetByManagerAndTeamNull);
employeesRoutes.delete("/deletar/:id", employeesController.Delete);
employeesRoutes.put("/editar/:id", employeesController.Update);
employeesRoutes.patch("/editarTime/:id", employeesController.UpdateTeam);

module.exports = employeesRoutes;
