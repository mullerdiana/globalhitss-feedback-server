const Answers = require("../models/answers");
const status = require("http-status");

exports.Create = (req, res, next) => {
	const { employee_id, question_id, value } = req.body;

	Answers.create({
		employee_id,
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
			res.status(status.OK).json(result);
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.send({ error: "Internal Server Error!" });
		});
};

exports.SearchOne = (req, res, next) => {
	const { id } = req.params;

	Answers.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Answers not found!" });
		});
};

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
						res.status(status.NOT_FOUND).send(error);
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Answers not found!" });
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
							res.status(404).json({ msg: "Question not found!" });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Answers not found!" });
		});
};
