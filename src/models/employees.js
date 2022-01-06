const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Managers = require("./managers");
const Teams = require("./teams");

const Employees = sequelize.define("employees", {
	name: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [1, 255],
		},
	},
	email: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING(100),
		validate: {
			len: [1, 100],
		},
	},
	password: {
		allowNull: false,
		type: Sequelize.STRING(100),
		validate: {
			len: [1, 100],
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(100),
		validate: {
			len: [1, 100],
		},
	},
	is_active: {
		type: Sequelize.BOOLEAN,
	},
});

Employees.belongsTo(Teams, {
	as: "Teams",
	foreignKey: "team_id",
});

Employees.belongsTo(Managers, {
	as: "Managers",
	foreignKey: "manager_id",
});

Employees.associate = (models) => {
	Employees.belongsToMany(models.Forms, {
		through: "employees_forms",
		as: "Employees_Forms",
	});
};

module.exports = Employees;
