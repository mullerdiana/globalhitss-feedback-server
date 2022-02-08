const express = require("express");
const employees_managersRoutes = express.Router();

const employees_managersController = require("../controllers/employees_managers");

// Rotas employees_managersController

employees_managersRoutes.post("/create", employees_managersController.Create);
// employees_managersRoutes.get("/all", employees_managersController.SearchAll);
// employees_managersRoutes.get(
//     "/get-data-employees-by-form",
//     employees_managersController.SearchForms
// );

// employees_managersRoutes.get(
//     "/get-answereds-by-employees",
//     employees_managersController.SearchFormsAnsweredsByEmployees
// );
// employees_managersRoutes.get(
//     "/get-answereds-by-form",
//     employees_managersController.GetAnsweredsByForm
// );
// employees_managersRoutes.get(
//     "/get-by-employee-and-answered",
//     employees_managersController.GetFormsByEmployeeAndAnswered
// );
// employees_managersRoutes.put("/edit/:id", employees_managersController.Update);

module.exports = employees_managersRoutes;
