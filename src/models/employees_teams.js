const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_teams = sequelize.define("employees_teams", {
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
    team_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "teams",
            key: "id",
        },
        onDelete: "NO ACTION",
        onUpdate: "NO ACTION",
    },
});

module.exports = Employees_teams;
