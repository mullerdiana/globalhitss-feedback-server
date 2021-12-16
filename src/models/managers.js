const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Managers = sequelize.define("manager", {
	name: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255],
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
});

module.exports = Managers;
