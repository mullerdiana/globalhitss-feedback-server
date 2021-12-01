//chama o Questions de dentro de models
const Questions = require('../models/questions');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Create = (req, res, next) => {
    //criando variaveis de reconhecimento da requisiçao, de acordo com o que tem no model
    //lembrando que id é auto incrementavel, nao precisa chama-lo
    const { textQuestion, type, idForm} = req.body;

    //Sequelize ira enviar os dados atraves do comando create. create é para inserir
    Questions.create({
        idForm,
        textQuestion,
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
    ).catch(next);

}

exports.SearchAll = (req, res, next) => {
    Questions.findAll()
        .then(
            (result) => {
                if (result) {
                    res.status(status.OK).send(result);
                }
            }
        ).catch(next);
}

exports.SearchOne = (req, res, next) => {
    const id = req.params.id;

    Questions.findByPk(id)
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

    Questions.findByPk(id)
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
    const idFormulario = req.body.idFormulario;
    const textoPergunta = req.body.textoPergunta;
    const tipo = req.body.tipo;

    Questions.findByPk(id)
        .then(
            result => {
                if (result) {
                    result.update({
                        idFormulario: idFormulario,
                        textoPergunta: textoPergunta,
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

// chave estrangeira - mostra todas respostas para as perguntas
exports.SearchAllRespsPerguntas = (req, res, next) => {
    Questions.findAll({include: ['resps']})
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

// chave estrangeira - mostra todas as respostas de uma determinada result
exports.SearchOneRespsPerguntas = (req, res, next) => {
    const id = req.params.id;

    Questions.findByPk(id, {include: ['resps']})
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