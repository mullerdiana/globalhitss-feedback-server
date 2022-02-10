const express = require("express");
const usersRoutes = express.Router();

const usersController = require("../controllers/users");

usersRoutes.post("/create", usersController.Create);
usersRoutes.get("/all", usersController.SearchAll);
// usersRoutes.get("/employee/:id", usersController.SearchOne);
// usersRoutes.get("/search", usersController.Search);
usersRoutes.get("/get-by-manager", usersController.GetByManager);
usersRoutes.get("/get-by-team", usersController.GetByTeam);
usersRoutes.get(
    "/get-by-manager-and-without-team",
    usersController.GetByManagerAndWithoutTeam
);
usersRoutes.patch("/edit-password/:id", usersController.UpdatePassword);
usersRoutes.patch(
    "/edit-name-and-email/:id",
    usersController.UpdateNameAndEmail
);
usersRoutes.patch("/edit-is-active/:id", usersController.UpdateIsActive);
usersRoutes.patch("/edit-team/:id", usersController.UpdateTeam);

module.exports = usersRoutes;
