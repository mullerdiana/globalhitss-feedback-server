const Employees_managers = require("../models/employees_managers");
const status = require("http-status");
const sequelize = require("../database/sequelize");

exports.Create = (req, res, next) => {
    const { employee_id, manager_id } = req.body;

    Employees_managers.create({
        employee_id,
        manager_id,
    })
        .then((result) => {
            if (result) {
                res.status(status.OK).send({
                    msg: "Relação entre colaborador e gestor criada",
                });
            } else {
                res.status(status.BAD_REQUEST).json({
                    msg: "Ocorreu um erro imprevisto",
                });
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(status.BAD_REQUEST).json({
                msg: "Não foi possível criar a relação entre colaborador e gestor.",
            });
        });
};

// exports.SearchAll = (req, res, next) => {
//     Employees_managers.findAll()
//         .then((result) => {
//             res.status(status.OK).json(result);
//         })
//         .catch(() => {
//             res.status(status.INTERNAL_SERVER_ERROR).json({
//                 msg: "Internal Server Error!",
//             });
//         });
// };

// exports.SearchForms = async (req, res, next) => {
//     const [response] = await sequelize.query(
//         `SELECT
//         forms.id as id_form,
// 		forms.title as title_form,
// 		employees_managers.id,
// 		employees_managers.answered,
// 		employees_managers.employees_id,
// 		employees_managers.created_at,
// 		employees_managers.updated_at
// 		FROM forms
// 		INNER JOIN employees_managers on forms.id = employees_managers.forms_id
// 		`
//     );

//     res.status(status.OK).send(response);
// };

// exports.SearchFormsAnsweredsByEmployees = async (req, res, next) => {
//     const [response] = await sequelize.query(
//         `SELECT
// 		employees_managers.id,
// 		employees_managers.forms_id as id_form,
// 		employees.id as id_employee,
// 		employees.name as name_employee
// 		,employees_managers.answered,
// 		employees_managers.created_at,
// 		employees_managers.updated_at
// 		FROM employees
// 		INNER JOIN employees_managers on employees.id = employees_managers.employees_id`
//     );

//     res.status(status.OK).send(response);
// };

// exports.GetAnsweredsByForm = async (req, res, next) => {
//     const { form, answered } = req.query;

//     const [response] = await sequelize.query(
//         `SELECT
// 		employees_managers.id,
// 		employees_managers.forms_id as id_form,
// 		employees.id as id_employee,
// 		employees.name as name_employee
// 		,employees_managers.answered,
// 		employees_managers.created_at,
// 		employees_managers.updated_at
// 		FROM employees
// 		INNER JOIN employees_managers on employees.id = employees_managers.employees_id where employees_managers.forms_id = ${form} AND employees_managers.answered = ${answered}`
//     );

//     res.status(status.OK).send(response);
// };

// exports.GetFormsByEmployeeAndAnswered = async (req, res, next) => {
//     const { employee_id, answered } = req.query;

//     const [response] = await sequelize.query(
//         `SELECT
// 		employees_managers.id,
// 		employees_managers.forms_id as id_form,
// 		employees_managers.answered,
// 		forms.title
// 		FROM employees_managers
// 		LEFT JOIN forms on employees_managers.forms_id = forms.id WHERE employees_id = ${employee_id} AND answered = ${answered}`
//     );

//     res.status(status.OK).send(response);
// };

// exports.Delete = (req, res, next) => {
//     const { id } = req.params;

//     Employees_managers.findByPk(id)
//         .then((result) => {
//             if (result) {
//                 result
//                     .destroy({
//                         where: { id: id },
//                     })
//                     .then((result) => {
//                         if (result) {
//                             res.status(status.OK).send();
//                         }
//                     })
//                     .catch((error) => {
//                         res.status(status.BAD_REQUEST).json({
//                             msg: "Ocorreu um erro imprevisto",
//                         });
//                     });
//             } else {
//                 res.status(status.BAD_REQUEST).json({
//                     msg: "Ocorreu um erro imprevisto",
//                 });
//             }
//         })
//         .catch(() => {
//             res.status(status.NOT_FOUND).json({
//                 msg: "Informação não encontrada",
//             });
//         });
// };

// exports.Update = (req, res, next) => {
//     const { id } = req.params;
//     const { answered } = req.body;

//     Employees_managers.findByPk(id)
//         .then((result) => {
//             if (result) {
//                 result
//                     .update(
//                         {
//                             answered: answered,
//                         },
//                         { where: { id: id } }
//                     )
//                     .then((result) => {
//                         if (result) {
//                             res.status(status.OK).send();
//                         }
//                     })
//                     .catch((error) => {
//                         if (
//                             error.name === "SequelizeForeignKeyConstraintError"
//                         ) {
//                             res.status(500).json({
//                                 msg: "Internal server error!",
//                             });
//                         }
//                     });
//             } else {
//                 res.status(status.BAD_REQUEST).json({
//                     msg: "Ocorreu um erro imprevisto",
//                 });
//             }
//         })
//         .catch(() => {
//             res.status(status.NOT_FOUND).json({
//                 msg: "Informação não encontrada",
//             });
//         });
// };
