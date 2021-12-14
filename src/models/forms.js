//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Questions = require('./questions');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Forms = sequelize.define('forms', {
	title: {
		allowNull: false,
		type: Sequelize.STRING(50),
		validate: {
			len: [3, 20],
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(20),
		validate: {
			len: [3, 20],
		},
	},
});

Forms.hasMany(Questions, {
	foreignKey: 'idForm',
	onUpdate: 'CASCADE',
	as: 'questionsForms',
});

// const init = async () => {
// 	await Forms.sync({ alter: true });
// };

// init();

module.exports = Forms;
