"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("answers", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			value: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			employee_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "employees",
					key: "id",
				},
			},
			question_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "questions",
					key: "id",
				},
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
		return queryInterface.dropTable("answers");
	},
};
