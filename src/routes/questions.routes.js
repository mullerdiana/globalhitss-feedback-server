const express = require("express");
const questionsRoutes = express.Router();

const questionsController = require("../controllers/questions");

questionsRoutes.post("/cadastrar", questionsController.Create);
questionsRoutes.get("/todos", questionsController.SearchAll);
questionsRoutes.get("/search", questionsController.SearchId);
questionsRoutes.get(
	"/buscar-perguntas-do-formulario",
	questionsController.SearchQuestionsByFormId
);
questionsRoutes.get("/pergunta/:id", questionsController.SearchOne);
questionsRoutes.delete("/deletar/:id", questionsController.Delete);
questionsRoutes.put("/editar/:id", questionsController.Update);

module.exports = questionsRoutes;
