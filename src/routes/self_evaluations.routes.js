const express = require("express");
const self_evaluationsRoutes = express.Router();

const self_evaluationsController = require("../controllers/self_evaluations");

self_evaluationsRoutes.post("/create", self_evaluationsController.Create);

module.exports = self_evaluationsRoutes;
