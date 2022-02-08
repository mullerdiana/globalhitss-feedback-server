const Teams = require("../models/teams");
const employees = require("../models/employees");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { name, manager_id } = req.body;

    Teams.create({
        name: name,
        manager_id: manager_id,
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).json({ msg: `Time criado` });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível criar o time",
            });
        });
};

exports.SearchAll = (req, res, next) => {
    Teams.findAll()
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            }
        })
        .catch((error) => {
            res.status(status.GATEWAY_TIMEOUT).send(error);
        });
};

exports.SearchOne = (req, res, next) => {
    const { id } = req.params;

    Teams.findByPk(id)
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
            res.status(status.NOT_FOUND).json({ msg: "Team not found!" });
        });
};

exports.Delete = (req, res, next) => {
    const { id } = req.params;

    Teams.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .destroy({
                        where: { id: id },
                    })
                    .then((result) => {
                        if (result) {
                            res.status(status.OK).json({
                                msg: `Time deletado`,
                            });
                        }
                    })
                    .catch(() => {
                        res.status(status.INTERNAL_SERVER_ERROR).json({
                            msg: "Internal Server Error!",
                        });
                    });
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({ msg: "Time não encontrado" });
        });
};

exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;

    Teams.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            name: name,
                        },
                        { where: { id: id } }
                    )
                    .then((result) => {
                        if (result) {
                            res.status(status.OK).json({
                                msg: `Time atualizado`,
                            });
                        }
                    })
                    .catch(() => {
                        res.status(status.INTERNAL_SERVER_ERROR).json({
                            msg: "Internal Server Error!",
                        });
                    });
            } else {
                res.status(status.NOT_FOUND).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({ msg: "Time não encontrado" });
        });
};

exports.SearchAllemployeesTimes = (req, res, next) => {
    Teams.findAll({ include: [{ model: employees, as: "employees" }] })
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            }
        })
        .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};

exports.SearchOneemployeesTimes = (req, res, next) => {
    const id = req.params.id;

    Teams.findByPk(id, { include: [{ model: employees, as: "employees" }] })
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
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};

exports.SearchAllFormsTimes = (req, res, next) => {
    Teams.findAll({ include: ["forms"] })
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            }
        })
        .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};

exports.SearchOneFormsTimes = (req, res, next) => {
    const id = req.params.id;

    Teams.findByPk(id, { include: ["forms"] })
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
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};
