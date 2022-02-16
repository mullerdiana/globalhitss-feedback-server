"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.addColumn(
                    "users",
                    "current_position",
                    {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: true,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "users",
                    "admission_date",
                    {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: true,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "users",
                    "project",
                    {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: true,
                    },
                    { transaction: t }
                ),
                queryInterface.addColumn(
                    "users",
                    "activities",
                    {
                        type: Sequelize.DataTypes.STRING,
                        allowNull: true,
                    },
                    { transaction: t }
                ),
            ]);
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize.transaction((t) => {
            return Promise.all([
                queryInterface.removeColumn("users", "current_position", {
                    transaction: t,
                }),
                queryInterface.removeColumn("users", "admission_date", {
                    transaction: t,
                }),
                queryInterface.removeColumn("users", "project", {
                    transaction: t,
                }),
                queryInterface.removeColumn("users", "activities", {
                    transaction: t,
                }),
            ]);
        });
    },
};
