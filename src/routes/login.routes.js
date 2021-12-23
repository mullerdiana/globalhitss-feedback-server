const express = require("express");
const loginRoutes = express.Router();

const loginService = require("../services/login");

loginRoutes.post("/login", loginService.login);
loginRoutes.post("/logintoken", loginService.loginWithToken);

module.exports = loginRoutes;
