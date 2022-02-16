const Users = require("../models/users");
const Employees_managers = require("../models/employees_managers");
const bcrypt = require("bcrypt");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const {
        name,
        email,
        password,
        type,
        manager_id,
        current_position,
        admission_date,
        project,
        activities,
    } = req.body;

    Users.create({
        name,
        email,
        password: bcrypt.hashSync(password, 10),
        type,
        current_position,
        admission_date,
        project,
        activities,
    })
        .then((result) => {
            if (result) {
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
        `SELECT users.id, users.name, users.email, users.current_position, users.admission_date, users.project, users.activities
        FROM users 
        JOIN employees_managers ON employees_managers.manager_id = ${manager} 
        WHERE employees_managers.employee_id = users.id
        AND users.is_active = 1
        `
    );

    res.status(status.OK).send(response);
};

exports.GetByTeam = async (req, res, next) => {
    const { team } = req.query;

    const [response] = await sequelize.query(
        `SELECT users.id, users.name, users.email, employees_teams.id as relation_id
        FROM users 
        JOIN employees_teams ON employees_teams.team_id = ${team} 
        WHERE employees_teams.employee_id = users.id
        AND users.is_active = 1
        `
    );

    res.status(status.OK).send(response);
};

exports.GetByManagerAndWithoutTeam = async (req, res, next) => {
    const { manager } = req.query;

    const [response] = await sequelize.query(
        `SELECT users.id, users.name, users.email, users.is_active
        FROM users
        INNER JOIN employees_managers ON employees_managers.employee_id = users.id 
        WHERE employees_managers.manager_id = ${manager}
        AND users.id NOT IN (SELECT employee_id FROM employees_teams)
        AND users.is_active = 1`
    );

    res.status(status.OK).send(response);
};

exports.UpdateManagerSpecs = (req, res, next) => {
    const { id } = req.params;
    const { current_position, admission_date, project, activities, password } =
        req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            current_position,
                            admission_date,
                            project,
                            activities,
                            password,
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

exports.UpdatePassword = (req, res, next) => {
    const { id } = req.params;
    const { password } = req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            password: bcrypt.hashSync(password, 10),
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

exports.UpdateNameAndEmail = (req, res, next) => {
    const { id } = req.params;
    const { name, email } = req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            name: name,
                            email: email,
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

exports.UpdateIsActive = (req, res, next) => {
    const { id } = req.params;
    const { is_active } = req.body;

    Users.findByPk(id)
        .then((result) => {
            if (result) {
                result
                    .update(
                        {
                            is_active,
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
