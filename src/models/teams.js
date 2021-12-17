//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Managers = require("./managers");

const Teams = sequelize.define("teams", {
	name: {
		allowNull: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255],
		},
	},
});

Teams.belongsTo(Managers, {
	as: "Managers",
	foreignKey: "manager_id",
});

module.exports = Teams;
