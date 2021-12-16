const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Managers = require("./managers");

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

Forms.belongsTo(Managers, {
	as: "Managers",
	foreignKey: "manager_id",
});

module.exports = Forms;
