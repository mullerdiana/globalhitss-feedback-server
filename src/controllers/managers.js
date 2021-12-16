const Managers = require("../models/managers");
const bcrypt = require("bcrypt");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { name, email, password, type } = req.body;

	Managers.create({
		name,
		email,
		password: bcrypt.hashSync(password, 10),
		type,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).json(result);
				// TODO: definir qual será mensagem de erro
			} else {
				res.status(status.NOT_FOUND).send();
			}
		})
		.catch((err) => {
			console.log(err);
			error = next(error);
		});
};

exports.SearchAll = (req, res, next) => {
	Managers.findAll()
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
		`SELECT * FROM managers WHERE name LIKE '%${search}%' OR email LIKE '%${search}%'`
	);
	//TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
	res.status(status.OK).send(response);
};

exports.SearchOne = (req, res, next) => {
	const { id } = req.params;
	Managers.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Managers not found!" });
		});
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Managers.findByPk(id)
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
			res.status(401).json({ msg: "Managers not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { name, email, password, type } = req.body;

	Managers.findByPk(id)
		.then((result) => {
			console.log(result);
			if (result.dateValues) {
				result
					.update(
						{
							name: name,
							email: email,
							password: bcrypt.hashSync(password, 10),
							type: type,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch((error) => {
						res.status(status.OK).send(error);
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Managers not found!" });
		});
};
