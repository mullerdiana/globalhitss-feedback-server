require("dotenv").config();

module.exports = {
	database: process.env.DATABASE_DB,
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	port: process.env.PORT,
	host: process.env.DATABASE_HOST,
	dialect: process.env.DATABASE_DIALECT,
	define: {
		ssl: process.env.PGSSLMODE,
		timestamps: true,
		underscored: true,
	},
};
