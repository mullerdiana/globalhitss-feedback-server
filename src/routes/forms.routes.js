const express = require('express');
const formsRoutes = express.Router();


const formsController = require('../controllers/formularioController')

formsRoutes.post('/cadastrar', formsController.Insert);
formsRoutes.get('/todos', formsController.SearchAll);
formsRoutes.get('/formulario/:id', formsController.SearchOne);
formsRoutes.put('/deletar/:id', formsController.Delete);
formsRoutes.put('/editar/:id', formsController.Update);
formsRoutes.get('/perguntas', formsController.SearchAllPergsFormularios);
formsRoutes.get('/pergunta/:id', formsController.SearchOnePergsFormularios);
formsRoutes.get('/respostas', formsController.SearchAllRespsFormularios);
formsRoutes.get('/resposta/:id', formsController.SearchOneRespsFormularios);

module.exports = formsRoutes;