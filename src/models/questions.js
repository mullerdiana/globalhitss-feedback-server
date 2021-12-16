const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Forms = require("./forms");

const Questions = sequelize.define("questions", {
	title: {
		allowNull: false,
		type: Sequelize.STRING(500),
		validate: {
			len: [3, 500], //define tamanho minimo e maximo do campo
		},
	},
	type: {
		allowNull: false,
		type: Sequelize.STRING(255),
		validate: {
			len: [3, 255],
		},
	},
});

Questions.belongsTo(Forms, {
	as: "Forms",
	foreignKey: "form_id",
});

module.exports = Questions;
