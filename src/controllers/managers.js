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
				res.status(status.OK).json({ msg: `Gestor "${name}" criado` });
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res
				.status(status.BAD_REQUEST)
				.json({ msg: "Não foi possível criar o gestor" });
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
				.json({ msg: "Internal Server Error!" });
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
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Gestor não encontrado" });
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
							res.status(status.OK).json({ msg: `Gestor deletado` });
						}
					})
					.catch((error) => {
						res
							.status(status.BAD_REQUEST)
							.json({ msg: "Ocorreu um erro imprevisto" });
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Gestor não encontrado" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { name, email, password, type } = req.body;

	Managers.findByPk(id)
		.then((result) => {
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
							res.status(status.OK).json({ msg: `Gestor atualizado` });
						}
					})
					.catch((error) => {
						res
							.status(status.BAD_REQUEST)
							.json({ msg: "Ocorreu um erro imprevisto" });
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Gestor não encontrado" });
		});
};
