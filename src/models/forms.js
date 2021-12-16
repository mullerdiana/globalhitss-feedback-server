const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Manager = require("./manager");

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

Forms.belongsTo(Manager, {
	as: "Manager",
	foreignKey: "manager_id",
});

module.exports = Forms;
