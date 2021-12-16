//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Manager = require("./manager");
const Forms = require("./forms");

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o name e os campos da tabela

const Teams = sequelize.define("teams", {
	name: {
		allowNull: true,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255], //define tamanho minimo e maximo do campo
		},
	},
});

Teams.belongsTo(Manager, {
	as: "Manager",
	foreignKey: "manager_id",
});

Teams.belongsToMany(Forms, {
	through: "teams_forms",
});

module.exports = Teams;
