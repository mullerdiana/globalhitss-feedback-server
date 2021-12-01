const express = require('express');
const usersRoutes = require('./users.routes');
const teamsRoutes = require('./teams.routes');
const formsRoutes = require('./forms.routes');
const questionsRoutes = require('./questions.routes');
const answersRoutes = require('./answers.routes');
const router = express.Router();

router.use('/usuarios', usersRoutes);
router.use('/times', teamsRoutes);
router.use('/formularios', formsRoutes);
router.use('/perguntas', questionsRoutes);
router.use('/respostas', answersRoutes);

module.exports = router