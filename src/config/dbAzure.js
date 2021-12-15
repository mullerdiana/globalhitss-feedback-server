require('dotenv').config();

module.exports = {
	database: process.env.DATABASE_DB,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	dialect: 'mssql',
	define: {
		timestamps: true,
		underscored: true,
	},
};
