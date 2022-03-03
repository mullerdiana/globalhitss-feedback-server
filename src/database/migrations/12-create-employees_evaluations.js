"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable("employees_evaluations", {
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
        return queryInterface.dropTable("employees_evaluations");
    },
};
