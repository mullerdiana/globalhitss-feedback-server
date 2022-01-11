require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Employess = require("../models/employees");
const Managers = require("../models/managers");

module.exports = {
	login(req, res, next) {
		const { email, password, type } = req.body;
		let model;

		if (type === "colaborador") {
			model = Employess;
		} else {
			model = Managers;
		}

		model
			.findOne({
				where: {
					email: email,
				},
			})
			.then((result) => {
				// Valida se o usuário existe
				if (!result) return res.status(401).json({ msg: "Manager not found" });

				// se existe, valida se a senha é igual
				if (!bcrypt.compareSync(password, result.password)) {
					return res.status(401).json({ msg: "Invalid password" });
				}

				// Cria um payload público para inserir no token
				let jwtPayload = {
					id: result.id,
					name: result.name,
					email: result.email,
					type: result.type,
					isActive: result.isActive,
				};
				// Cria o token com informação do payload e hash secret
				let token = jwt.sign(jwtPayload, process.env.JWT_SECRET);

				return res.status(200).json({ jwtPayload, token });
			})
			.catch((error) => {
				return res.status(500).send(error);
			});
	},

	loginWithToken(req, res, next) {
		const { token } = req.body;

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				// permit.fail(res);
				return res.status(401).json({ msg: "failed to authenticate token!" });
			}
		});
		res.status(200).json({ msg: "Token validado" });
	},
};
