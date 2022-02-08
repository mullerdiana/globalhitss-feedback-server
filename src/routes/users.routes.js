const express = require("express");
const usersRoutes = express.Router();

const usersController = require("../controllers/users");

usersRoutes.post("/create", usersController.Create);
// usersRoutes.get("/all", usersController.SearchAll);
// usersRoutes.get("/employee/:id", usersController.SearchOne);
// usersRoutes.get("/search", usersController.Search);
// usersRoutes.get("/get-by-manager", usersController.GetByManager);
// usersRoutes.get(
//     "/get-by-manager-and-team",
//     usersController.GetByManagerAndTeam
// );
// usersRoutes.get(
//     "/get-by-manager-and-team-null",
//     usersController.GetByManagerAndTeamNull
// );
// usersRoutes.delete("/delete/:id", usersController.Delete);
// usersRoutes.put("/edit/:id", usersController.Update);
// usersRoutes.patch("/edit-team/:id", usersController.UpdateTeam);

module.exports = usersRoutes;
