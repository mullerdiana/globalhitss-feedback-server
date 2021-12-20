require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Employess = require("../models/employees");
const Managers = require("../models/managers");

module.exports = {
	login(req, res, next) {
		const { email, password, type } = req.body;

		if (type === "managers" || type === "admin") {
			Managers.findOne({
				where: {
					email: email,
				},
			})
				.then((manager) => {
					// Valida se o usuário existe
					if (!manager)
						return res.status(401).json({ error: "Email not found" });

					// se existe, valida se a senha é igual
					if (!bcrypt.compareSync(password, manager.password)) {
						return res.status(401).json({ error: "Invalid password" });
					}

					// Cria um payload público para inserir no token
					let jwtPayload = {
						name: manager.name,
						email: manager.email,
						type: manager.type,
					};
					// Cria o token com informação do payload e hash secret
					let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

					return res.status(200).json({ token });
				})
				.catch((error) => {
					return res.status(500).send(error);
				});
		} else {
			Employess.findOne({
				where: {
					email: email,
				},
			})
				.then((employee) => {
					if (!employee)
						return res.status(401).json({ error: "Email not found" });

					if (!bcrypt.compareSync(password, employee.password)) {
						return res.status(401).json({ error: "Invalid password" });
					}

					let jwtPayload = {
						name: employee.name,
						email: employee.email,
						type: employee.type,
					};
					let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

					return res.status(200).json({ token });
				})
				.catch((error) => {
					return res.status(500).send(error);
				});
		}
	},
};
