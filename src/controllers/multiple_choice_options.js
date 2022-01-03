const MultipleChoiceOptions = require("../models/multiple_choice_options");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { question_id, title } = req.body;

	MultipleChoiceOptions.create({
		question_id,
		title,
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
	MultipleChoiceOptions.findAll()
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

	MultipleChoiceOptions.findByPk(id)
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Option not found!" });
		});
};

exports.SearchId = async (req, res, next) => {
	const { search } = req.query;

	MultipleChoiceOptions.findAll({
		where: {
			question_id: search,
		},
	})
		.then((result) => {
			if (result.length > 1) {
				res.status(status.OK).send(result);
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Option not found" });
		});
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	MultipleChoiceOptions.findByPk(id)
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
			res.status(401).json({ msg: "Option not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { title } = req.body;

	MultipleChoiceOptions.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							title,
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
							res.status(404).json({ msg: "Option not found!" });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "Option not found!" });
		});
};
