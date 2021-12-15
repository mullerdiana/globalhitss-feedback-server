//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Questions = require('./questions');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o name e os campos da tabela

const Forms = sequelize.define('forms', {
	title: {
		allowNull: false,
		type: Sequelize.STRING(100),
		validate: {
			len: [3, 100],
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(100),
		validate: {
			len: [3, 100],
		},
	},
});

// Forms.hasMany(Questions, {
// 	foreignKey: 'idForm',
// 	onUpdate: 'CASCADE',
// 	as: 'questionsForms',
// });

// const init = async () => {
// 	await Forms.sync({ alter: true });
// };

// init();

module.exports = Forms;
