const express = require('express');
const formsRoutes = express.Router();


const formsController = require('../controllers/formularioController')

formsRoutes.post('/inserirFormulario', formsController.Insert);
formsRoutes.get('/formularios', formsController.SearchAll);
formsRoutes.get('/formularios/:id', formsController.SearchOne);
formsRoutes.put('/deletarFormulario/:id', formsController.Delete);
formsRoutes.put('/editarFormulario/:id', formsController.Update);
formsRoutes.get('/pergsFormulario', formsController.SearchAllPergsFormularios);
formsRoutes.get('/pergsFormulario/:id', formsController.SearchOnePergsFormularios);
formsRoutes.get('/respsFormulario', formsController.SearchAllRespsFormularios);
formsRoutes.get('/respsFormulario/:id', formsController.SearchOneRespsFormularios);

module.exports = formsRoutes;