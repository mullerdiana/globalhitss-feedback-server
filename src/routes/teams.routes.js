const express = require("express");
const teamsRoutes = express.Router();

const teamsController = require("../controllers/teams");

teamsRoutes.post("/create", teamsController.Create);
teamsRoutes.get("/all", teamsController.SearchAll);
teamsRoutes.get("/team/:id", teamsController.SearchOne);
teamsRoutes.delete("/delete/:id", teamsController.Delete);
teamsRoutes.put("/edit/:id", teamsController.Update);

module.exports = teamsRoutes;
