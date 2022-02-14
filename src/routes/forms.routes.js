const express = require("express");
const formsRoutes = express.Router();

const formsController = require("../controllers/forms");

formsRoutes.post("/create", formsController.Create);
formsRoutes.get("/all", formsController.SearchAll);
formsRoutes.get("/form/:id", formsController.SearchOne);
formsRoutes.get("/get-by-manager", formsController.GetByManager);
formsRoutes.delete("/delete/:id", formsController.Delete);
formsRoutes.put("/edit/:id", formsController.Update);
formsRoutes.patch("/edit-is-active/:id", formsController.UpdateIsActive);

module.exports = formsRoutes;
