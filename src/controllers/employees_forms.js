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
