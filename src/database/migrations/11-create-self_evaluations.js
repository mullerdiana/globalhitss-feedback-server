"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("self_evaluations", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            strong: {
                type: Sequelize.STRING(4000),
                allowNull: false,
            },
            improve: {
                type: Sequelize.STRING(4000),
                allowNull: false,
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
            is_active: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
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
        return queryInterface.dropTable("self_evaluations");
    },
};
