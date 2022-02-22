"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn("self_evaluations", "manager", {
            type: Sequelize.STRING,
            allowNull: true,
        });
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.removeColumn("self_evaluations", "manager");
    },
};
