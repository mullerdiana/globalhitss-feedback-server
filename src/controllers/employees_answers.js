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

