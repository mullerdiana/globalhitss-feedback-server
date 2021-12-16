const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Managers = require("./managers");
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

Users.belongsTo(Managers, {
	as: "Managers",
	foreignKey: "manager_id",
});

module.exports = Users;
