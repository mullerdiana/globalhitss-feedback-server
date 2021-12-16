//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Forms = require('./forms');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o name e os campos da tabela

const Questions = sequelize.define('questions', {
	title: {
		allowNull: false,
		type: Sequelize.STRING(500),
		validate: {
			len: [3, 500], //define tamanho minimo e maximo do campo
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255],
		},
	},
	form_id: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: Forms,
			key: 'id',
		},
	},
});

Questions.belongsTo(Forms, {
	as: 'Forms',
	foreignKey: 'form_id',
});

module.exports = Questions;
