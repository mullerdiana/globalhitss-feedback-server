const express = require('express');
const answerRoutes = express.Router();

const respostaController = require('../controllers/respostaController')

answerRoutes.post('/inserirResposta', respostaController.Insert);
answerRoutes.get('/respostas', respostaController.SearchAll);
answerRoutes.get('/respostas/:id', respostaController.SearchOne);
answerRoutes.put('/deletarResposta/:id', respostaController.Delete);
answerRoutes.put('/editarResposta/:id', respostaController.Update);

module.exports = answerRoutes;