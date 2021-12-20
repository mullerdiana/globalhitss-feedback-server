const express = require("express");
const employees_AnswersRoutes = express.Router();

const employees_answers = require("../controllers/employees_answers")
const employees_formsController = require("../controllers/employees_forms");

// Rotas employees_answers
employees_AnswersRoutes.post("/enviarformulario", employees_formsController.Create);

employees_AnswersRoutes.post("/enviarresposta", employees_answers.Create);
employees_AnswersRoutes.get("/todos/enviarresposta", employees_answers.SearchAll);
employees_AnswersRoutes.delete("/enviarresposta/deletar/:id", employees_answers.Delete);
employees_AnswersRoutes.put("/enviarresposta/editar/:id", employees_answers.Update);

module.exports = employees_AnswersRoutes;