//chama o Forms de dentro de models
const Forms = require('../models/forms');
const status = require('http-status');

//comando para realizar inserção dos dados através de requisição
exports.Create = (req, res, next) => {
    const { title, type } = req.body;

    Forms.create({
        title,
        type
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
                // TODO: definir qual será mensagem de erro
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch((err) => {
            console.log(err);
            error = next(error);
        });

}

exports.SearchAll = (req, res, next) => {
    Forms.findAll()
        .then((result) => {
            res.status(status.OK).json(result);
        })
        .catch(() => {
            res.status(status.INTERNAL_SERVER_ERROR).send({ error: "Internal Server Error!" });
        });

}

exports.SearchOne = (req, res, next) => {
    const { id } = req.params;

    Forms.findByPk(id)
        .then((result) => {
            if (result) {
                res.status(status.OK).send(result);
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            res.status(401).json({ msg: 'Form not found!' });
        });
}

exports.Delete = (req, res, next) => {
    const { id } = req.params;

    Forms.findByPk(id)
        .then((result) => {
            if (result) {
                result.destroy({
                    where: { id: id }
                }).then((result) => {
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
			res.status(401).json({ msg: 'Form not found!' });
		});

}

exports.Update = (req, res, next) => {
    const { id } = req.params;
    const { title, type } = req.body;

    Forms.findByPk(id)
        .then(
            result => {
                if (result) {
                    result.update({
                        title: title,
                        type: type
                    }, { where: { id: id } }
                    )
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch((error) => {
						if (error.name === 'SequelizeForeignKeyConstraintError') {
							res.status(404).json({ msg: 'Forms not found!' });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: 'Form not found!' });
		});
}


// chave estrangeira - mostra todas as perguntas de um determinado form
exports.SearchOnePergsFormularios = (req, res, next) => {
    const id = req.params.id;

    Forms.findByPk(id, { include: ['pergs'] })
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