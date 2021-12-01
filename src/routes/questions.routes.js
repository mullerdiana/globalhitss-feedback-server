const express = require('express');
const questionsRoutes = express.Router();


const questionsController = require('../controllers/perguntaController')

questionsRoutes.post('/inserirPergunta', questionsController.Insert);
questionsRoutes.get('/perguntas', questionsController.SearchAll);
questionsRoutes.get('/perguntas/:id', questionsController.SearchOne);
questionsRoutes.put('/deletarPergunta/:id', questionsController.Delete);
questionsRoutes.put('/editarPergunta/:id', questionsController.Update);
questionsRoutes.get('/respsPergunta', questionsController.SearchAllRespsPerguntas);
questionsRoutes.get('/respsPergunta/:id', questionsController.SearchOneRespsPerguntas);

module.exports = questionsRoutes