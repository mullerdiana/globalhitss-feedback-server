const Answers = require("../models/answers");
const status = require("http-status");

exports.Create = (req, res, next) => {
	const { question_id, value } = req.body;

	Answers.create({
		question_id,
		value,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res.status(status.NOT_FOUND).send();
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).send({ msg: "Question not found!" });
		});
};

exports.SearchAll = (req, res, next) => {
	Answers.findAll()
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch(() => {
			error = next(error);
		});
};

exports.SearchOne = (req, res, next) => {
	const id = req.params.id;

	Answers.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch(() => {
			error = next(error);
		});
};

exports.Delete = (req, res, next) => {
	const id = req.params.id;

	Answers.findByPk(id)
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
						error = next(error);
					});
			}
		})
		.catch(() => {
			error = next(error);
		});
};

exports.Update = (req, res, next) => {
	const id = req.params.id;
	const idFormulario = req.body.idFormulario;
	const textoPergunta = req.body.textoPergunta;
	const tipo = req.body.tipo;

	Answers.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							idFormulario: idFormulario,
							textoPergunta: textoPergunta,
							tipo: tipo,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch(() => {
						(error) => next(error);
					});
			}
		})
		.catch(() => {
			(error) => next(error);
		});
};

// chave estrangeira - mostra todas respostas para as perguntas
exports.SearchAllRespsPerguntas = (req, res, next) => {
	Answers.findAll({ include: ["resps"] })
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			}
		})
		.catch(() => {
			error = next(error);
		});
};

// chave estrangeira - mostra todas as respostas de uma determinada result
exports.SearchOneRespsPerguntas = (req, res, next) => {
	const id = req.params.id;

	Answers.findByPk(id, { include: ["resps"] })
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
