const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Managers = require("./managers");

const Teams = sequelize.define("teams", {
	name: {
		allowNull: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [1, 255],
		},
	},
	is_active: {
		type: Sequelize.BOOLEAN,
	},
});

Teams.belongsTo(Managers, {
	as: "Managers",
	foreignKey: "manager_id",
});

module.exports = Teams;
