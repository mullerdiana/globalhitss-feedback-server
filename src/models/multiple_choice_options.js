const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Questions = require("./questions");

const MultipleChoiceOptions = sequelize.define("multiple_choice_options", {
	title: {
		allowNull: false,
		type: Sequelize.STRING(1000),
		validate: {
			len: [3, 1000],
		},
	},
});

MultipleChoiceOptions.belongsTo(Questions, {
	as: "Questions",
	foreignKey: "question_id",
});

module.exports = MultipleChoiceOptions;
