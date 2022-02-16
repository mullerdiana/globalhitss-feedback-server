const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_managers = sequelize.define("employees_managers", {
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
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
});

module.exports = Employees_managers;
