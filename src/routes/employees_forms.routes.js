const express = require("express");
const employees_FormsRoutes = express.Router();

const employees_Forms = require("../controllers/employees_forms");

// Rotas employees_Forms

employees_FormsRoutes.post("/create", employees_Forms.Create);
employees_FormsRoutes.get("/all", employees_Forms.SearchAll);
employees_FormsRoutes.get(
    "/get-data-employees-by-form",
    employees_Forms.SearchForms
);

employees_FormsRoutes.get(
    "/get-answereds-by-employees",
    employees_Forms.SearchFormsAnsweredsByEmployees
);
employees_FormsRoutes.get(
    "/get-answereds-by-form",
    employees_Forms.GetAnsweredsByForm
);
employees_FormsRoutes.get(
    "/get-by-employee-and-answered",
    employees_Forms.GetFormsByEmployeeAndAnswered
);
employees_FormsRoutes.put("/edit/:id", employees_Forms.Update);

module.exports = employees_FormsRoutes;
