const express = require('express');
const teamsRoutes = express.Router();

const teamsController = require('../controllers/teams')

teamsRoutes.post('/cadastrar', teamsController.Create);
teamsRoutes.get('/todos', teamsController.SearchAll);
teamsRoutes.get('/times/:id', teamsController.SearchOne);
teamsRoutes.put('/deletar/:id', teamsController.Delete);
teamsRoutes.put('/editar/:id', teamsController.Update);
teamsRoutes.get('/usuarios', teamsController.SearchAllUsersTimes);
teamsRoutes.get('/usuario/:id', teamsController.SearchOneUsersTimes);
teamsRoutes.get('/formularios', teamsController.SearchAllFormsTimes);
teamsRoutes.get('/formulario/:id', teamsController.SearchOneFormsTimes);
teamsRoutes.get('/contagem', teamsController.ContagemTimes);

module.exports = teamsRoutes;