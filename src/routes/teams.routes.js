const express = require('express');
const teamsRoutes = express.Router();

const teamsController = require('../controllers/timesController')

teamsRoutes.post('/inserirTime', teamsController.Insert);
teamsRoutes.get('/times', teamsController.SearchAll);
teamsRoutes.get('/times/:id', teamsController.SearchOne);
teamsRoutes.put('/deletarTime/:id', teamsController.Delete);
teamsRoutes.put('/editarTime/:id', teamsController.Update);
teamsRoutes.get('/usersTime', teamsController.SearchAllUsersTimes);
teamsRoutes.get('/usersTime/:id', teamsController.SearchOneUsersTimes);
teamsRoutes.get('/formsTime', teamsController.SearchAllFormsTimes);
teamsRoutes.get('/formsTime/:id', teamsController.SearchOneFormsTimes);
teamsRoutes.get('/contagemTimes', teamsController.ContagemTimes);

module.exports = teamsRoutes;