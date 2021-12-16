const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Manager = require("./manager");
const Teams = require("./teams");

const Users = sequelize.define("users", {
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

Users.belongsTo(Teams, {
	as: "Teams",
	foreignKey: "team_id",
});

Users.belongsTo(Manager, {
	as: "Manager",
	foreignKey: "manager_id",
});

module.exports = Users;
