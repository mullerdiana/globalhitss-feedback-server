const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Forms = require("./forms");
const MultipleChoiceOptions = require("./multiple_choice_options");

const Questions = sequelize.define("questions", {
	title: {
		allowNull: false,
		type: Sequelize.STRING(500),
		validate: {
			len: [1, 500],
		},
	},
	is_selectable: {
		type: Sequelize.BOOLEAN,
	},
	is_active: {
		type: Sequelize.BOOLEAN,
	},
});

Questions.belongsTo(Forms, {
	as: "Forms",
	foreignKey: "form_id",
});

Questions.hasMany(MultipleChoiceOptions, {
	as: "Questions",
	foreignKey: "question_id",
	onDelete: "CASCADE",
	onUpdate: "CASCADE",
});

module.exports = Questions;
