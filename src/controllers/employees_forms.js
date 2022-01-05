const Employees_forms = require("../models/employees_forms");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
	const { employees_id, forms_id } = req.body;
	Employees_forms.create({
		employees_id,
		forms_id,
	})
		.then((result) => {
			if (result) {
				res.status(status.OK).send(result);
			} else {
				res.status(status.BAD_REQUEST).send();
			}
		})
		.catch((error) => {
			res.status(status.BAD_REQUEST).send(error);
		});
};

exports.SearchAll = (req, res, next) => {
	Employees_forms.findAll()
		.then((result) => {
			res.status(status.OK).json(result);
		})
		.catch(() => {
			res
				.status(status.INTERNAL_SERVER_ERROR)
				.send({ error: "Internal Server Error!" });
		});
};

exports.SearchForms = async (req, res, next) => {
	const [response] = await sequelize.query(
		`SELECT forms.id as id_form, forms.title as title_form, employees_forms.answered, employees_forms.employees_id, employees_forms.created_at, employees_forms.updated_at FROM forms INNER JOIN employees_forms on forms.id = employees_forms.forms_id
		`
	);

	res.status(status.OK).send(response);
};

exports.Delete = (req, res, next) => {
	const { id } = req.params;

	Employees_forms.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.destroy({
						where: { id: id },
					})
					.then((result) => {
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
			res.status(401).json({ msg: "Employees_forms not found!" });
		});
};

exports.Update = (req, res, next) => {
	const { id } = req.params;
	const { answered } = req.body;

	Employees_forms.findByPk(id)
		.then((result) => {
			if (result) {
				result
					.update(
						{
							answered: answered,
						},
						{ where: { id: id } }
					)
					.then((result) => {
						if (result) {
							res.status(status.OK).send(result);
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res.status(500).json({ msg: "Internal server error!" });
						}
					});
			} else {
				throw new Error();
			}
		})
		.catch(() => {
			res.status(401).json({ msg: "employees_forms not found!" });
		});
};
