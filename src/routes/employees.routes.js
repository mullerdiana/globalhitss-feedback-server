const express = require("express");
const employeesRoutes = express.Router();

const employeesController = require("../controllers/employees");

employeesRoutes.post("/create", employeesController.Create);
employeesRoutes.get("/all", employeesController.SearchAll);
employeesRoutes.get("/employee/:id", employeesController.SearchOne);
employeesRoutes.get("/search", employeesController.Search);
employeesRoutes.get("/get-by-manager", employeesController.GetByManager);
employeesRoutes.get(
    "/get-by-manager-and-team",
    employeesController.GetByManagerAndTeam
);
employeesRoutes.get(
    "/get-by-manager-and-team-null",
    employeesController.GetByManagerAndTeamNull
);
employeesRoutes.delete("/delete/:id", employeesController.Delete);
employeesRoutes.put("/edit/:id", employeesController.Update);
employeesRoutes.patch("/edit-team/:id", employeesController.UpdateTeam);

module.exports = employeesRoutes;
