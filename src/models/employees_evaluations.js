const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Employees_evaluations = sequelize.define("employees_evaluations", {
    employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    manager_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    knowledge: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    skills: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    attitudes: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    need: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    action_plan: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    observations: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
});

Employees_evaluations.associate = (models) => {
    Employees_evaluations.belongsTo(models.Users, {
        as: "User",
        foreignKey: "employee_id",
    }),
    Employees_evaluations.belongsTo(models.Users, {
        as: "User",
        foreignKey: "manager_id",
    });
};

module.exports = Employees_evaluations;
