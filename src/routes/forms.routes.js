const express = require('express');
const formsRoutes = express.Router();


const formsController = require('../controllers/forms');

formsRoutes.post('/cadastrar', formsController.Create);
formsRoutes.get('/todos', formsController.SearchAll);
formsRoutes.get('/formulario/:id', formsController.SearchOne);
formsRoutes.delete('/deletar/:id', formsController.Delete);
formsRoutes.put('/editar/:id', formsController.Update);

// //////////////////////////

formsRoutes.get('/pergunta/:id', formsController.SearchOnePergsFormularios);

module.exports = formsRoutes;