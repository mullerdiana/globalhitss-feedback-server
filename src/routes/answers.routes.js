const express = require("express");
const answerRoutes = express.Router();

const answersController = require("../controllers/answers");

answerRoutes.post("/create", answersController.Create);
answerRoutes.get("/all", answersController.SearchAll);
answerRoutes.get(
    "/get-answers-values-by-question",
    answersController.SearchForAnswerValues
);
answerRoutes.get(
    "/get-answers-by-employee",
    answersController.GetAnswersByEmployee
);
answerRoutes.get("/get-answer/:id", answersController.SearchOne);
answerRoutes.delete("/delete/:id", answersController.Delete);
answerRoutes.put("/edit/:id", answersController.Update);

module.exports = answerRoutes;
