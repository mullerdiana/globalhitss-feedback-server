const express = require("express");
const employeesRoutes = express.Router();

const employeesController = require("../controllers/employees");
const employees_answers = require("../controllers/employees_answers")

employeesRoutes.post("/cadastrar", employeesController.Create);
employeesRoutes.get("/todos/colaboradores", employeesController.SearchAll);
employeesRoutes.get("/colaborador/:id", employeesController.SearchOne);
employeesRoutes.get("/search", employeesController.Search);
employeesRoutes.delete("/deletar/:id", employeesController.Delete);
employeesRoutes.put("/editar/:id", employeesController.Update);
employeesRoutes.post("/enviarresposta", employees_answers.Create);

module.exports = employeesRoutes;
