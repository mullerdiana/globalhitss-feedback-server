const express = require("express");
const employees_teamsRoutes = express.Router();

const employees_teamsController = require("../controllers/employees_teams");

// Rotas employees_teamsController

employees_teamsRoutes.post("/create", employees_teamsController.Create);
// employees_teamsRoutes.get("/all", employees_teamsController.SearchAll);
// employees_teamsRoutes.get(
//     "/get-data-employees-by-form",
//     employees_teamsController.SearchForms
// );

// employees_teamsRoutes.get(
//     "/get-answereds-by-employees",
//     employees_teamsController.SearchFormsAnsweredsByEmployees
// );
// employees_teamsRoutes.get(
//     "/get-answereds-by-form",
//     employees_teamsController.GetAnsweredsByForm
// );
// employees_teamsRoutes.get(
//     "/get-by-employee-and-answered",
//     employees_teamsController.GetFormsByEmployeeAndAnswered
// );

employees_teamsRoutes.delete("/delete/:id", employees_teamsController.Delete);

// employees_teamsRoutes.put("/edit/:id", employees_teamsController.Update);

module.exports = employees_teamsRoutes;
