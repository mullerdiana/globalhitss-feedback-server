const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_forms = sequelize.define("employees_forms", {
	employees_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: "employees",
			key: "id",
		},
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION",
	},
	forms_id: {
		type: Sequelize.INTEGER,
		allowNull: false,
		references: {
			model: "forms",
			key: "id",
		},
		onDelete: "NO ACTION",
		onUpdate: "NO ACTION",
	},
	answered: {
		type: Sequelize.BOOLEAN
	}
});

module.exports = Employees_forms;
