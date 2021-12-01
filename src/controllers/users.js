const User = require("../models/users");
const bcrypt = require("bcrypt");
const status = require('http-status');
const sequelize = require('../sequelize');

//comando para realizar inserção dos dados através de requisição
exports.Create = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const {name, username, email, password, type} = req.body;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    User.create({
        name, //name da chave : constante criada acima
        username,
        email,
        password: bcrypt.hashSync(password, 10),
        type
    }).then(
        (result) => {
            if (result) {
                res.status(status.OK).json(result);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        }
    ).catch(
        () => {
            error = next(error)
        }
    )

}

exports.SearchAll = (req, res, next) => {
    User.findAll()
        .then(
            (result) => {
                res.status(status.OK).json(result);
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Search = async(req, res, next) => {
    const {
        q
    } = req.query;
    const [response] = await sequelize.query(`SELECT * FROM usuarios WHERE name LIKE '%${q}%' OR username LIKE '%${q}%'`)
    res.status(status.OK).send(response);
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(
            (result) => {
                if (result) {
                    result.destroy({
                        where: { id: id }
                    }).then(
                        (result) => {
                            if (result) {
                                res.status(status.OK).send();
                            }
                        }
                    ).catch(
                        () => {
                            error = next(error)
                        }
                    )
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const type = req.body.type;
    const idTime = req.body.idTime;

    User.findByPk(id)
        .then(
            result => {
                if (result) {
                    result.update({
                            name: name,
                            username: username,
                            password: password,
                            type: type,
                            idTime: idTime
                        }, { where: { id: id } })
                        .then(
                            (result) => {
                                if (result) {
                                    res.status(status.OK).send(result);
                                }
                            }
                        ).catch(
                            () => {
                                error => next(error)
                            }
                        )
                }
            }
        )
        .catch(
            () => {
                error => next(error)
            }
        )
}

// chave estrangeira - mostra todas respostas por todos avaliadores
exports.SearchAllRespsAvaliador = (req, res, next) => {
    User.findAll({ include: ['respsAvaliador'] })
        .then(result => {
            if (result) {
                res.status(status.OK).send(result);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de uma determinado avaliador
exports.SearchOneRespsAvaliador = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id, { include: ['respsAvaliador'] })
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                } else {
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas respostas por todos avaliados
exports.SearchAllRespsAvaliado = (req, res, next) => {
    User.findAll({ include: ['respsAvaliado'] })
        .then(result => {
            if (result) {
                res.status(status.OK).send(result);
            }
        }).catch(
            () => {
                error = next(error)
            }
        )
}

// chave estrangeira - mostra todas as respostas de uma determinado avaliado
exports.SearchOneRespsAvaliado = (req, res, next) => {
    const id = req.params.id;

    User.findByPk(id, { include: ['respsAvaliado'] })
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                } else {
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}

exports.ContagemUsuarios = async(req, res, next) => {
    try {
        const [response] = await sequelize.query('SELECT count(id) AS count FROM usuarios')
        res.status(status.OK).send(response[0]);
    } catch (error) {
        next(error)
    }
}

exports.Recentes = async(req, res, next) => {
    try {
        const [response] = await sequelize.query('SELECT * FROM  usuarios order by  id desc LIMIT 5 ')
        res.status(status.OK).send(response);
    } catch (error) {
        next(error)
    }
}