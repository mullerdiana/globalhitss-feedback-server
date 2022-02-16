const Self_evaluations = require("../models/self_evaluations");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { user_id, strong, improve, knowledge, skills, attitudes } = req.body;

    Self_evaluations.create({
        user_id,
        strong,
        improve,
        knowledge,
        skills,
        attitudes,
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).json({
                    msg: `Auto avaliação respondida com sucesso`,
                });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível responder sua auto avaliação",
            });
        });
};
