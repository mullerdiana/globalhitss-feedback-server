const express = require("express");
const employees_FormsRoutes = express.Router();

const employees_Forms = require("../controllers/employees_forms")

// Rotas employees_Forms

employees_FormsRoutes.post("/enviarforms", employees_Forms.Create);
employees_FormsRoutes.get("/todos/enviarforms", employees_Forms.SearchAll);
employees_FormsRoutes.delete("/enviarforms/deletar/:id", employees_Forms.Delete);
employees_FormsRoutes.put("/enviarforms/editar/:id", employees_Forms.Update);

module.exports = employees_FormsRoutes;