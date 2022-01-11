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
				res.status(status.OK).json({ msg: `Colaborador "${name}" criado` });
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res
				.status(status.BAD_REQUEST)
				.json({ msg: "Não foi possível criar o colaborador" });
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
				.json({ msg: "Internal Server Error!" });
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
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Colaborador não encontrado" });
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
							res.status(status.OK).json({ msg: `Colaborador deletado` });
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
			res.status(status.NOT_FOUND).json({ msg: "Colaborador não encontrado" });
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
							res.status(status.OK).json({ msg: `Colaborador atualizado` });
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res
								.status(status.NOT_FOUND)
								.json({ msg: "Colaborador não encontrado" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Colaborador não encontrado" });
		});
};

exports.UpdateTeam = (req, res, next) => {
	const { id } = req.params;
	const { team_id } = req.body;

	employee
		.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							team_id,
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
							res
								.status(status.NOT_FOUND)
								.json({ msg: "Colaborador não encontrado" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Colaborador não encontrado" });
		});
};
