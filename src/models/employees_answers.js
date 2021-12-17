const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_answers = sequelize.define("employees_answers", {
    employees_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "employees",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
    answers_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "answers",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
    value_answer: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Employees_answers;