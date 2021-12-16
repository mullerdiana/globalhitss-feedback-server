//chama o Time de dentro de models
const Teams = require("../models/teams");
const employees = require("../models/employees");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { name, manager_id } = req.body;
	Teams.create({
		name: name,
		manager_id,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res.status(status.BAD_REQUEST).send();
			}
		})
		.catch((error) => {
			res.status(status.BAD_REQUEST).send(error);
		});
};

exports.SearchAll = (req, res, next) => {
	Teams.findAll()
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch((error) => {
			res.status(status.GATEWAY_TIMEOUT).send(error);
		});
};

exports.SearchOne = (req, res, next) => {
	const { id } = req.params;

	Teams.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).send({ error: "Team not found!" });
		});
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Teams.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.destroy({
						where: { id: id },
					})
					.then((result) => {
						if (result) {
							res.status(status.OK).send();
						}
					})
					.catch(() => {
						res
							.status(status.INTERNAL_SERVER_ERROR)
							.send({ error: "Internal Server Error!" });
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).send({ error: "Team not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	Teams.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							name: name,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch(() => {
						res
							.status(status.INTERNAL_SERVER_ERROR)
							.send({ error: "Internal Server Error!" });
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).send({ error: "Team not found!" });
		});
};

// chave estrangeira - mostra todos os times e seus usuarios
exports.SearchAllemployeesTimes = (req, res, next) => {
	Teams.findAll({ include: [{ model: employees, as: "employees" }] })
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch(() => {
			error = next(error);
		});
};

// chave estrangeira - mostra todos os usuarios de um determinado result
exports.SearchOneemployeesTimes = (req, res, next) => {
	const id = req.params.id;

	Teams.findByPk(id, { include: [{ model: employees, as: "employees" }] })
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res.status(status.NOT_FOUND).send();
			}
		})
		.catch(() => {
			error = next(error);
		});
};

// chave estrangeira - mostra todos os times e seus formularios
exports.SearchAllFormsTimes = (req, res, next) => {
	Teams.findAll({ include: ["forms"] })
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch(() => {
			error = next(error);
		});
};

// chave estrangeira - mostra todos os formularios de um determinado result
exports.SearchOneFormsTimes = (req, res, next) => {
	const id = req.params.id;

	Teams.findByPk(id, { include: ["forms"] })
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res.status(status.NOT_FOUND).send();
			}
		})
		.catch(() => {
			error = next(error);
		});
};

exports.ContagemTimes = async (req, res, next) => {
	try {
		const [response] = await sequelize.query(
			"SELECT count(id) AS count FROM `times`"
		);
		res.status(status.OK).send(response[0]);
	} catch (error) {
		next(error);
	}
};
