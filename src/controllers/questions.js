const Questions = require("../models/questions");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { title, type, form_id, is_selectable } = req.body;

	Questions.create({
		form_id,
		title,
		type,
		is_selectable,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).json({ msg: `Pergunta "${title}" criada` });
			} else {
				res
					.status(status.NOT_FOUND)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch((error) => {
			res
				.status(status.BAD_REQUEST)
				.json({ msg: "Não foi possível criar a pergunta" });
		});
};

exports.SearchAll = (req, res, next) => {
	Questions.findAll()
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
	Questions.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res
					.status(status.NOT_FOUND)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Question not found!" });
		});
};

exports.SearchId = async (req, res, next) => {
	const { search } = req.query;

	const [response] = await sequelize.query(
		`SELECT * FROM questions WHERE form_id LIKE '%${search}%'`
	);
	res.status(status.OK).send(response);
};

exports.SearchQuestionsByFormId = async (req, res, next) => {
	const { formId } = req.query;

	const [response] = await sequelize.query(
		`SELECT questions.id, questions.title, questions.is_selectable FROM questions WHERE questions.form_id = ${formId}`
	);
	res.status(status.OK).send(response);
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Questions.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.destroy({
						where: { id: id },
					})
					.then((result) => {
						if (result) {
							res.status(status.OK).json({ msg: `Pergunta deletada` });
						}
					})
					.catch((error) => {
						res.status(status.NOT_FOUND).send(error);
					});
			} else {
				res
					.status(status.NOT_FOUND)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Pergunta não encontrada!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { title, is_selectable } = req.body;

	Questions.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							title,
							is_selectable,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).json({ msg: `Pergunta atualizada` });
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res
								.status(status.NOT_FOUND)
								.json({ msg: "Pergunta não encontrada" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Pergunta não encontrada" });
		});
};
