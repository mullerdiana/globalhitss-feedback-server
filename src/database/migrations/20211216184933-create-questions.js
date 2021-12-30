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
				type: Sequelize.STRING,
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
				type: Sequelize.BOOLEAN,
				defaultValue: true,
			},
			is_active: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
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
