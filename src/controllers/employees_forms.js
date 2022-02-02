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
				res.status(status.OK).send({ msg: "Formulário enviado" });
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch((error) => {
			res
				.status(status.BAD_REQUEST)
				.json({ msg: "Não foi possível enviar o formulário" });
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
				.json({ msg: "Internal Server Error!" });
		});
};

exports.SearchForms = async (req, res, next) => {
	const [response] = await sequelize.query(
		`SELECT forms.id as id_form, forms.title as title_form, employees_forms.id ,employees_forms.answered, employees_forms.employees_id, employees_forms.created_at, employees_forms.updated_at FROM forms INNER JOIN employees_forms on forms.id = employees_forms.forms_id
		`
	);

	res.status(status.OK).send(response);
};

exports.SearchFormsAnsweredsByEmployees = async (req, res, next) => {
	const [response] = await sequelize.query(
		`SELECT 
		employees_forms.id,
		employees_forms.forms_id as id_form, 
		employees.id as id_employee,
		employees.name as name_employee
		,employees_forms.answered,
		employees_forms.created_at,
		employees_forms.updated_at
		FROM employees 
		INNER JOIN employees_forms on employees.id = employees_forms.employees_id`
	);

	res.status(status.OK).send(response);
};

exports.GetAnsweredsByForm = async (req, res, next) => {
	const { form, answered } = req.query;

	const [response] = await sequelize.query(
		`SELECT 
		employees_forms.id,
		employees_forms.forms_id as id_form, 
		employees.id as id_employee,
		employees.name as name_employee
		,employees_forms.answered,
		employees_forms.created_at,
		employees_forms.updated_at
		FROM employees 
		INNER JOIN employees_forms on employees.id = employees_forms.employees_id where employees_forms.forms_id = ${form} AND employees_forms.answered = ${answered}`
	)

	res.status(status.OK).send(response);
}

exports.GetFormsByEmployeeAndAnswered = async (req, res, next) => {
	const {employee_id, answered} = req.query;

	const [response] = await sequelize.query(
		`SELECT 
		employees_forms.id,
		employees_forms.forms_id as id_form,
		employees_forms.answered,
		forms.title
		FROM employees_forms
		LEFT JOIN forms on employees_forms.forms_id = forms.id WHERE employees_id = ${employee_id} AND answered = ${answered}`
	)

	res.status(status.OK).send(response);
}

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
						res
							.status(status.BAD_REQUEST)
							.json({ msg: "Ocorreu um erro imprevisto" });
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Informação não encontrada" });
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
							res.status(status.OK).send();
						}
					})
					.catch((error) => {
						if (error.name === "SequelizeForeignKeyConstraintError") {
							res.status(500).json({ msg: "Internal server error!" });
						}
					});
			} else {
				res
					.status(status.BAD_REQUEST)
					.json({ msg: "Ocorreu um erro imprevisto" });
			}
		})
		.catch(() => {
			res.status(status.NOT_FOUND).json({ msg: "Informação não encontrada" });
		});
};
