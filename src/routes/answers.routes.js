const express = require('express');
const answerRoutes = express.Router();

const respostaController = require('../controllers/respostaController')

answerRoutes.post('/cadastrar', respostaController.Insert);
answerRoutes.get('/todas', respostaController.SearchAll);
answerRoutes.get('/resposta/:id', respostaController.SearchOne);
answerRoutes.put('/deletar/:id', respostaController.Delete);
answerRoutes.put('/editar/:id', respostaController.Update);

module.exports = answerRoutes;