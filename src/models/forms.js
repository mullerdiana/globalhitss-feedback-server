const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Forms = sequelize.define("forms", {
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

module.exports = Forms;
