//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Answers = require('./answers');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Questions = sequelize.define('questions', {
	textQuestion: {
		allowNull: false,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255], //define tamanho minimo e maximo do campo
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(255),
		defaultValue: 'text',
	},
});

// Questions.hasMany(Answers, {
// 	foreignKey: 'idQuestion',
// 	onUpdate: 'CASCADE',
// 	as: 'questionsAnswers',
// });

// const init = async () => {
// 	await Questions.sync({ alter: true });
// };

// init();

module.exports = Questions;
