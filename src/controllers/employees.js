const employee = require("../models/employees");
const bcrypt = require("bcrypt");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { name, email, password, type, manager_id } = req.body;

	employee
		.create({
			name,
			email,
			password: bcrypt.hashSync(password, 10),
			type,
			manager_id,
		})
		.then((result) => {
			if (result) {
				res.status(status.OK).json(result);
				// TODO: definir qual será mensagem de erro
			} else {
				res.status(status.NOT_FOUND).send();
			}
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.send({ error: "Internal Server Error!" });
		});
};

exports.SearchAll = (req, res, next) => {
	employee
		.findAll()
		.then((result) => {
			res.status(status.OK).json(result);
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.send({ error: "Internal Server Error!" });
		});
};

exports.Search = async (req, res, next) => {
	const { search } = req.query;

	const [response] = await sequelize.query(
		`SELECT * FROM employees WHERE name LIKE '%${search}%' OR email LIKE '%${search}%'`
	);
	//TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
	res.status(status.OK).send(response);
};

exports.SearchOne = (req, res, next) => {
	const { id } = req.params;

	employee
		.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "employee not found!" });
		});
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	employee
		.findByPk(id)
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
					.catch((error) => {
						res.status(status.NOT_FOUND).send(error);
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "employee not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { name, email, password, type, team_id } = req.body;

	employee
		.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							name: name,
							email: email,
							password: bcrypt.hashSync(password, 10),
							type: type,
							team_id: team_id,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res.status(404).json({ msg: "Teams not found!" });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "employee not found!" });
		});
};
