//chama o Forms de dentro de models
const Forms = require('../models/forms');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Create = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const { title, type } = req.body;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Forms.create({
        title,
        type
    }).then(
        (result) => {
            if (result) {
                res.status(status.OK).send(result);
            }
            else {
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
    Forms.findAll()
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

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Forms.findByPk(id)
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

    Forms.findByPk(id)
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
    const idTime = req.body.idTime;
    const tipo = req.body.tipo;
    
    Forms.findByPk(id)
        .then(
            result => {
                if (result) {
                    result.update({
                        idTime: idTime,
                        tipo: tipo
                    }, { where: { id: id } }
                    )
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

// chave estrangeira - mostra todas perguntas em seus formularios
exports.SearchAllPergsFormularios = (req, res, next) => {
    Forms.findAll({include: ['pergs']})
        .then(result => {
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

// chave estrangeira - mostra todas as perguntas de um determinado form
exports.SearchOnePergsFormularios = (req, res, next) => {
    const id = req.params.id;

    Forms.findByPk(id, {include: ['pergs']})
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                }else{
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}


// chave estrangeira - mostra todas respostas em seus formularios
exports.SearchAllRespsFormularios = (req, res, next) => {
    Forms.findAll({include: ['resps']})
        .then(result => {
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

// chave estrangeira - mostra todas as respostas de um determinado form
exports.SearchOneRespsFormularios = (req, res, next) => {
    const id = req.params.id;

    Forms.findByPk(id, {include: ['resps']})
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                }else{
                    res.status(status.NOT_FOUND).send();
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}