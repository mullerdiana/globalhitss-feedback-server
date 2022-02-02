const express = require("express");
const answerRoutes = express.Router();

const answersController = require("../controllers/answers");

answerRoutes.post("/cadastrar", answersController.Create);
answerRoutes.get("/todas", answersController.SearchAll);
answerRoutes.get("/valores", answersController.SearchForAnswerValues);
answerRoutes.get("/get-answers-by-employee", answersController.GetAnswersByEmployee);
answerRoutes.get("/resposta/:id", answersController.SearchOne);
answerRoutes.delete("/deletar/:id", answersController.Delete);
answerRoutes.put("/editar/:id", answersController.Update);

module.exports = answerRoutes;
