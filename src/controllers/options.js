const Options = require("../models/options");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { question_id, title } = req.body;

    Options.create({
        question_id,
        title,
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).json({ msg: `Opção "${title}" criada` });
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível criar a opção",
            });
        });
};

exports.SearchAll = (req, res, next) => {
    Options.findAll()
        .then((result) => {
            res.status(status.OK).json(result);
        })
        .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};

exports.SearchOne = (req, res, next) => {
    const { id } = req.params;

    Options.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(401).json({ msg: "Option not found!" });
        });
};

exports.GetOptionsByQuestion = async (req, res, next) => {
    const { question } = req.query;

    Options.findAll({
        where: {
            question_id: question,
        },
    })
        .then((result) => {
            if (result.length > 1) {
                res.status(status.OK).send(result);
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({ msg: "Option not found" });
        });
};

exports.Delete = (req, res, next) => {
    const { id } = req.params;

    Options.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .destroy({
                        where: { id: id },
                    })
                    .then((result) => {
                        if (result) {
                            res.status(status.OK).json({
                                msg: `Opção deletada`,
                            });
                        }
                    })
                    .catch((error) => {
                        res.status(status.BAD_REQUEST).json({
                            msg: "Ocorreu um erro imprevisto",
                        });
                    });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({ msg: "Opção não encontrada" });
        });
};

exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { title } = req.body;

    Options.findByPk(id)
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
                            res.status(status.OK).json({
                                msg: `Opção atualizada`,
                            });
                        }
                    })
                    .catch((error) => {
                        if (
                            error.name === "SequelizeForeignKeyConstraintError"
                        ) {
                            res.status(404).json({ msg: "Option not found!" });
                        }
                    });
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(401).json({ msg: "Opção não encontrada" });
        });
};
