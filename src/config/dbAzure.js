import * as tedious from 'tedious';

module.exports = {
	database: process.env.DATABASE_DB,
	// excluir depois database: 'dbGerenciamentoCustosGH',
	username: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	host: process.env.DATABASE_HOST,
	dialect: 'mssql',
	dialectModule: tedious,
};
