"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("employees_teams", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
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
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable("employees_teams");
    },
};
