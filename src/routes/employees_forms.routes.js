const express = require("express");
const employees_FormsRoutes = express.Router();

const employees_Forms = require("../controllers/employees_forms");

// Rotas employees_Forms

employees_FormsRoutes.post("/enviarforms", employees_Forms.Create);
employees_FormsRoutes.get("/todos", employees_Forms.SearchAll);
employees_FormsRoutes.get("/formularios", employees_Forms.SearchForms);
employees_FormsRoutes.delete("/enviarforms/deletar/:id",employees_Forms.Delete);
employees_FormsRoutes.get("/respostas",employees_Forms.SearchFormsAnsweredsByEmployees);
employees_FormsRoutes.get("/get-by-employee-and-answered", employees_Forms.GetFormsByEmployeeAndAnswered);
employees_FormsRoutes.put("/editar/:id", employees_Forms.Update);

module.exports = employees_FormsRoutes;
