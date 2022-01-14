require("dotenv").config();

module.exports = {
	database: 'd7ilm0j559t6ck',
	username: 'pzsnndwbzksdzk',
	password: '5ca4ffb794352871c135b2c55d3c2e108240a2d2df782a44c097652f0fbf2408',
	port: '5432',
	host: 'ec2-184-73-243-101.compute-1.amazonaws.com',
	dialect: 'postgres',
	define: {
		ssl: 'no-verify',
		timestamps: true,
		underscored: true,
	},
};
