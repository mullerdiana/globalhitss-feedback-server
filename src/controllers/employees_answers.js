const Employees_answers = require("../models/employees_answers");
const bcrypt = require("bcrypt");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { value_answer, answers_id, employees_id } = req.body;

    Employees_answers.create({
        value_answer: value_answer,
        answers_id: answers_id,
        employees_id: employees_id
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

	Employees_answers.findAll()
		.then((result) => {
			res.status(status.OK).json(result);
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.send({ error: "Internal Server Error!" });
		});
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Employees_answers.findByPk(id)
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
			res.status(401).json({ msg: "employees_answers not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { value_answer } = req.body;

	Employees_answers.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							value_answer: value_answer
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
							res.status(500).json({ msg: "Internal server error!" });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "employees_answers not found!" });
		});
};
