const express = require('express');
const usersRoutes = express.Router();

const usersController = require('../controllers/users')
    
usersRoutes.post('/cadastrar', usersController.Create);
usersRoutes.get('/todos', usersController.SearchAll);
usersRoutes.get('/usuarios/:id', usersController.SearchOne);
usersRoutes.post('/usuarios/search', usersController.Search);
usersRoutes.put('/deletarUsuario/:id', usersController.Delete);
usersRoutes.put('/editarUsuario/:id', usersController.Update);
usersRoutes.get('/respsAvaliador', usersController.SearchAllRespsAvaliador);
usersRoutes.get('/respsAvaliador/:id', usersController.SearchOneRespsAvaliador);
usersRoutes.get('/respsAvaliado', usersController.SearchAllRespsAvaliado);
usersRoutes.get('/respsAvaliado/:id', usersController.SearchOneRespsAvaliado);
usersRoutes.get('/contagemUsuarios', usersController.ContagemUsuarios);
usersRoutes.get('/usuariosRecentes', usersController.Recentes);

module.exports = usersRoutes;