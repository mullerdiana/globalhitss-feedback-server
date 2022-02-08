"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("questions", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING(4000),
            },
            form_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "forms",
                    key: "id",
                },
            },
            is_selectable: {
                type: Sequelize.INTEGER,
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
        return queryInterface.dropTable("questions");
    },
};
