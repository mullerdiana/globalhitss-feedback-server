const express = require("express");
const optionsRoutes = express.Router();

const optionsController = require("../controllers/options");

optionsRoutes.post("/create", optionsController.Create);
optionsRoutes.get("/all", optionsController.SearchAll);
optionsRoutes.get("/get-by-question", optionsController.GetOptionsByQuestion);
optionsRoutes.get("/get-answer/:id", optionsController.SearchOne);
optionsRoutes.delete("/delete/:id", optionsController.Delete);
optionsRoutes.put("/edit/:id", optionsController.Update);

module.exports = optionsRoutes;
