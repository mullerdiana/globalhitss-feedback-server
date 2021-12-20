const { Sequelize } = require("sequelize");
const dbAzureConfig = require("../config/dbAzure");

const sequelize = new Sequelize(dbAzureConfig);

sequelize
	.authenticate()
	.then(() => console.log("Connection has been established successfully."))
	.catch((err) => console.error("Unable to connect to the database:", err));

module.exports = sequelize;
