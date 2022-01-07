const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Questions = require("./questions");

const MultipleChoiceOptions = sequelize.define("multiple_choice_options", {
	title: {
		allowNull: false,
		type: Sequelize.STRING(1000),
	},
});

module.exports = MultipleChoiceOptions;
