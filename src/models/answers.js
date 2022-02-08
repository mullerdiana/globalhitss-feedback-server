const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Answers = sequelize.define("answers", {
    value: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
});

Answers.associate = (models) => {
    Answers.belongsTo(models.Questions, {
        as: "Questions",
        foreignKey: "question_id",
    });

    Answers.belongsTo(models.Users, {
        as: "Employee",
        foreignKey: "employee_id",
    });
};

module.exports = Answers;
