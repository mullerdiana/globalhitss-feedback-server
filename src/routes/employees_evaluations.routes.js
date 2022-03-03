const express = require("express");
const employees_evaluationsRoutes = express.Router();

const employees_evaluationsController = require("../controllers/employees_evaluations");

employees_evaluationsRoutes.get(
    "/get-by-user",
    employees_evaluationsController.GetByUser
);
employees_evaluationsRoutes.post("/create", employees_evaluationsController.Create);
employees_evaluationsRoutes.get("/pdf", employees_evaluationsController.GetPDF);

module.exports = employees_evaluationsRoutes;
