"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("employees_answers", {
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
			answers_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "answers",
					key: "id",
				},
				onDelete: "NO ACTION",
				onUpdate: "NO ACTION",
			},
			value_answer: {
				type: Sequelize.STRING,
				allowNull: false,
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
		return queryInterface.dropTable("employees_answers");
	},
};
