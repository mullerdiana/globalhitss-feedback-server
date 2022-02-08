const Users = require("../models/users");
const Employees_managers = require("../models/employees_managers");
const bcrypt = require("bcrypt");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { name, email, password, type, manager_id } = req.body;

    Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        type,
    })
        .then((result) => {
            if (result) {
                console.log(result.type);
                if (result.type === 2) {
                    Employees_managers.create({
                        employee_id: result.id,
                        manager_id: manager_id,
                    });
                }

                res.status(status.OK).json({ msg: `Usuário criado` });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível criar o usuário",
            });
        });
};

exports.SearchAll = (req, res, next) => {
    Users.findAll()
        .then((result) => {
            res.status(status.OK).json(result);
        })
        .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).json({
                msg: "Internal Server Error!",
            });
        });
};

exports.Search = async (req, res, next) => {
    const { search } = req.query;

    const [response] = await sequelize.query(
        `SELECT * FROM Userss WHERE name LIKE '%${search}%' OR email LIKE '%${search}%'`
    );
    //TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
    res.status(status.OK).send(response);
};

exports.SearchOne = (req, res, next) => {
    const { id } = req.params;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({
                msg: "Colaborador não encontrado",
            });
        });
};

exports.GetByManager = async (req, res, next) => {
    const { manager } = req.query;

    const [response] = await sequelize.query(
        `SELECT users.id, users.name, users.email, users.is_active 
        FROM users 
        JOIN employees_managers ON employees_managers.manager_id = ${manager} WHERE employees_managers.employee_id = users.id`
    );
    //TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
    res.status(status.OK).send(response);
};

exports.GetByManagerAndTeam = async (req, res, next) => {
    const { manager, team } = req.query;

    const [response] = await sequelize.query(
        `SELECT id, name, email, team_id, is_active FROM Users WHERE manager_id LIKE '%${manager}%' AND team_id LIKE '%${team}%'`
    );
    //TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
    res.status(status.OK).send(response);
};

exports.GetByManagerAndTeamNull = async (req, res, next) => {
    const { manager } = req.query;

    const [response] = await sequelize.query(
        `SELECT id, name, email, team_id, is_active FROM Users WHERE manager_id LIKE '%${manager}%' AND team_id IS NULL`
    );
    //TODO: Validar se ao não encontrar usuário, é correto retornar status 200 e array vazio
    res.status(status.OK).send(response);
};

exports.Delete = (req, res, next) => {
    const { id } = req.params;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .destroy({
                        where: { id: id },
                    })
                    .then((result) => {
                        if (result) {
                            res.status(status.OK).json({
                                msg: `Colaborador deletado`,
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (
                            error.name === "SequelizeForeignKeyConstraintError"
                        ) {
                            res.status(status.BAD_REQUEST).json({
                                msg: "O colaborador possui formulários atribuídos para resposta e não pode ser excluído",
                            });
                        } else {
                            res.status(status.BAD_REQUEST).json({
                                msg: "Colaborador não encontrado",
                            });
                        }
                    });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Colaborador não encontrado",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({
                msg: "Colaborador não encontrado",
            });
        });
};

exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { name, email, password, type, team_id } = req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            name: name,
                            email: email,
                            password: bcrypt.hashSync(password, 10),
                            type: type,
                            team_id: team_id,
                        },
                        { where: { id: id } }
                    )
                    .then((result) => {
                        if (result) {
                            res.status(status.OK).json({
                                msg: `Colaborador atualizado`,
                            });
                        }
                    })
                    .catch((error) => {
                        if (
                            error.name === "SequelizeForeignKeyConstraintError"
                        ) {
                            res.status(status.NOT_FOUND).json({
                                msg: "Colaborador não encontrado",
                            });
                        }
                    });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({
                msg: "Colaborador não encontrado",
            });
        });
};

exports.UpdateTeam = (req, res, next) => {
    const { id } = req.params;
    const { team_id } = req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            team_id,
                        },
                        { where: { id: id } }
                    )
                    .then((result) => {
                        if (result) {
                            if (team_id === null) {
                                res.status(status.OK).json({
                                    msg: `Colaborador removido do time`,
                                });
                            } else {
                                res.status(status.OK).json({
                                    msg: `Colaborador adicionado ao time`,
                                });
                            }
                        }
                    })
                    .catch((error) => {
                        if (
                            error.name === "SequelizeForeignKeyConstraintError"
                        ) {
                            res.status(status.NOT_FOUND).json({
                                msg: "Colaborador não encontrado",
                            });
                        }
                    });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch(() => {
            res.status(status.NOT_FOUND).json({
                msg: "Colaborador não encontrado",
            });
        });
};
