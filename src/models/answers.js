const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Questions = require("./questions");

const Answers = sequelize.define("answers", {
	value: {
		allowNull: false,
		type: Sequelize.STRING(1000),
		validate: {
			len: [3, 1000],
		},
	},
});

Answers.belongsTo(Questions, {
	as: "Questions",
	foreignKey: "question_id",
});

Answers.associate = (models) => {
	Answers.belongsToMany(models.Employees, {
		through: "employees_answers",
		as: "Answers_Employees",
	});
};

module.exports = Answers;
