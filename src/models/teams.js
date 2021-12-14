//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Users = require('./users');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Teams = sequelize.define('teams', {
	nome: {
		allowNull: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255], //define tamanho minimo e maximo do campo
		},
	},
});

Teams.hasMany(Users, {
	foreignKey: 'idUser',
	onUpdate: 'CASCADE',
	as: 'teamsUser',
});

const init = async () => {
	await Teams.sync({ alter: true });
};

init();

module.exports = Teams;
