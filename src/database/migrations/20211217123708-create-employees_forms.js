"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("employees_forms", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			employees_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "employees",
					key: "id",
				},
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
			},
			forms_id: {
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
				type: Sequelize.BOOLEAN,
				defaultValue: false,
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
		return queryInterface.dropTable("employees_forms");
	},
};