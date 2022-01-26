//chama o Forms de dentro de models
const Forms = require("../models/forms");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { title, type, manager_id } = req.body;

	Forms.create({
		title,
		type,
		manager_id,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).json({ msg: `Formulário "${title}" criado` });
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res
				.status(status.BAD_REQUEST)
				.json({ msg: "Não foi possível criar o formulário" });
		});
};

exports.SearchAll = (req, res, next) => {
	Forms.findAll()
		.then((result) => {
			res.status(status.OK).json(result);
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.json({ msg: "Internal Server Error!" });
		});
};

exports.SearchOne = (req, res, next) => {
	const { id } = req.params;

	Forms.findByPk(id)
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
			res.status(status.NOT_FOUND).json({ msg: "Formulário não encontrado" });
		});
};

exports.GetByManager = async (req, res, next) => {
	const { manager } = req.query;

	const [response] = await sequelize.query(
		`SELECT id, title, type, is_active FROM forms WHERE manager_id LIKE '%${manager}%'`
	);
	res.status(status.OK).send(response);
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Forms.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.destroy({
						where: { id: id },
					})
					.then((result) => {
						if (result) {
							res.status(status.OK).json({ msg: `Formulário deletado` });
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
			res.status(status.NOT_FOUND).json({ msg: "Formulário não encontrado" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { title, type } = req.body;

	Forms.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							title: title,
							type: type,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).json({ msg: `Formulário atualizado` });
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res
								.status(status.NOT_FOUND)
								.json({ msg: "Formulário não encontrado" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Formulário não encontrato" });
		});
};

exports.SearchOnePergsFormularios = (req, res, next) => {
	const id = req.params.id;

	Forms.findByPk(id, { include: ["pergs"] })
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
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.json({ msg: "Internal Server Error!" });
		});
};
