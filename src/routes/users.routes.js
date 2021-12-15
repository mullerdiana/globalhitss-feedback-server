const express = require('express');
const usersRoutes = express.Router();

const usersController = require('../controllers/users');

usersRoutes.post('/cadastrar', usersController.Create);
usersRoutes.get('/todos', usersController.SearchAll);
usersRoutes.get('/usuario/:id', usersController.SearchOne);
usersRoutes.get('/search', usersController.Search);
usersRoutes.delete('/deletar/:id', usersController.Delete);
usersRoutes.put('/editar/:id', usersController.Update);

module.exports = usersRoutes;
