const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_forms = sequelize.define("employees_forms", {
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
    form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "forms",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
    answered: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Employees_forms;
