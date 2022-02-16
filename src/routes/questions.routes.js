const express = require("express");
const questionsRoutes = express.Router();

const questionsController = require("../controllers/questions");

questionsRoutes.post("/create", questionsController.Create);
questionsRoutes.get("/all", questionsController.SearchAll);
questionsRoutes.get("/search", questionsController.SearchId);
questionsRoutes.get(
    "/get-by-form",
    questionsController.SearchQuestionsByFormId
);
questionsRoutes.get("/question/:id", questionsController.SearchOne);
questionsRoutes.delete("/delete/:id", questionsController.Delete);
questionsRoutes.put("/edit/:id", questionsController.Update);

module.exports = questionsRoutes;
