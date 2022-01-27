const { Sequelize } = require("sequelize");
const dbConfig = require("../config/dbAzure");

const sequelize = new Sequelize(dbConfig);

sequelize
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
