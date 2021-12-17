const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Employees = require("./employees");
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

Forms.associate = (models) => {
	Forms.belongsToMany(models.Employees, {
		through: "employees_forms",
		as: "Forms_Employees",
	});
};

module.exports = Forms;
