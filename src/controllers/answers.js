const Answers = require("../models/answers");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { value } = req.body;
	let check = true

		value.map((item) => {
			Answers.create({
				employee_id: item.employee_id,
				question_id: item.question_id,
				value: item.value,
			})
				.then((result) => {
					if (result) {
						if(check){
							check = false;
							res.status(status.OK).json({ msg: "Respostas enviadas" });
						}
					} else {
						res
							.status(status.BAD_REQUEST)
							.json({ msg: "Ocorreu um erro imprevisto" });
					}
				})
				.catch(() => {
					res
						.status(status.BAD_REQUEST)
						.json({ msg: "Não foi possível salvar a resposta" });
				});
		})
};

exports.SearchAll = (req, res, next) => {
	Answers.findAll()
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

	Answers.findByPk(id)
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
			res.status(status.NOT_FOUND).json({ msg: "Resposta não encontrada" });
		});
};

exports.SearchForAnswerValues = async (req, res, next) => {
	const [response] = await sequelize.query(
		`SELECT questions.id as id_question, questions.title as title_question, questions.form_id as id_form, answers.id as id_answer, answers.value,
		answers.employee_id as id_employee
		FROM questions
		INNER JOIN answers on questions.id = answers.question_id`
	);

	res.status(status.OK).send(response);
};

exports.GetAnswersByEmployee = async (req, res, next) => {
	const {employee} = req.query;

	Answers.findAll({where: { employee_id: employee}}).then((result) => {
		if(result) {
			res.status(status.OK).send(result)
		}
	}).catch(() => {
		res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
	})
}

exports.Delete = (req, res, next) => {
	const { id } = req.params;

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
			res.status(status.NOT_FOUND).json({ msg: "Resposta não encontrada" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { value } = req.body;

	Answers.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							value: value,
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
								.json({ msg: "Resposta não encontrada" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Resposta não encontrada" });
		});
};
