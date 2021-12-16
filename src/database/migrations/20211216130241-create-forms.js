'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable('forms', {
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
			type: {
				allowNull: false,
				type: Sequelize.STRING,
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
		return queryInterface.dropTable('forms');
	},
};
