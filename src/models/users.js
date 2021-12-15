//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Teams = require('../models/teams');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Users = sequelize.define('users', {
	name: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255], //define tamanho minimo e maximo do campo
		},
	},
	email: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING(100),
		validate: {
			len: [3, 100],
		},
	},
	password: {
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
	teamId: {
		type: Sequelize.INTEGER,
		allowNull: true,
		references: {
			model: Teams,
			key: 'id',
		},
	},
});

Users.belongsTo(Teams, {
	as: 'Teams',
	foreignKey: 'teamId',
});

// Users.associations = (models) => {
// 	Users.belongsTo(models.Teams, {

// 	});
// };

// const init = async () => {
// 	await Users.sync({ alter: true });
// };

// init();

module.exports = Users;
