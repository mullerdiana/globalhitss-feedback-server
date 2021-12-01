const express = require('express');
const questionsRoutes = express.Router();


const questionsController = require('../controllers/perguntaController')

questionsRoutes.post('/cadastrar', questionsController.Insert);
questionsRoutes.get('/perguntas', questionsController.SearchAll);
questionsRoutes.get('/pergunta/:id', questionsController.SearchOne);
questionsRoutes.put('/deletar/:id', questionsController.Delete);
questionsRoutes.put('/editar/:id', questionsController.Update);
questionsRoutes.get('/respostas', questionsController.SearchAllRespsPerguntas);
questionsRoutes.get('/resposta/:id', questionsController.SearchOneRespsPerguntas);

module.exports = questionsRoutes