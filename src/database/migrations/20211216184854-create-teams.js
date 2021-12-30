"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("teams", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			manager_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "managers",
					key: "id",
				},
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
		return queryInterface.dropTable("teams");
	},
};
