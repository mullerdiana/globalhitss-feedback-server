const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_forms = sequelize.define("employees_forms", {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
	},
	answered: {
		type: Sequelize.BOOLEAN,
		defaultValue: false,
	},
});

module.exports = Employees_forms;
