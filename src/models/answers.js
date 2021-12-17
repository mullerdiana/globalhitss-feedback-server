//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");
const Questions = require("./questions");

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o name e os campos da tabela

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
