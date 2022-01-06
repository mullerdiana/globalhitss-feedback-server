const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Questions = require("./questions");
const Employees = require("./employees");

const Answers = sequelize.define("answers", {
	value: {
		allowNull: false,
		type: Sequelize.STRING(1000),
		validate: {
			len: [1, 1000],
		},
	},
});

Answers.belongsTo(Questions, {
	as: "Questions",
	foreignKey: "question_id",
});

Answers.belongsTo(Employees, {
	as: "Employees",
	foreignKey: "employee_id",
});

module.exports = Answers;
