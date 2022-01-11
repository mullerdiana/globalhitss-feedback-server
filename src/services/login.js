require("dotenv").config();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Employess = require("../models/employees");
const Managers = require("../models/managers");

module.exports = {
	login(req, res, next) {
		const { email, password } = req.body;

		Managers.findOne({
			where: {
				email: email,
			},
		})
			.then((result) => {
				if (!result) {
					Employess.findOne({
						where: {
							email: email,
						},
					})
						.then((result) => {
							if (!result)
								return res.status(401).json({ msg: "Usuário não encontrado" });

							if (result.is_active) {
								if (!bcrypt.compareSync(password, result.password)) {
									return res.status(401).json({ msg: "Credenciais inválidas" });
								}

								let jwtPayload = {
									id: result.id,
									name: result.name,
									email: result.email,
									type: result.type,
									isActive: result.isActive,
								};

								let token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
									expiresIn: "12h",
								});

								return res.status(200).json({ jwtPayload, token });
							} else {
								return res.status(400).json({
									msg: "O usuario não existe ou foi desativado na base de dados",
								});
							}
						})
						.catch(() => {
							return res.status(401).json({ msg: "Usuário não encontrado" });
						});
				}

				if (result.is_active) {
					if (!bcrypt.compareSync(password, result.password)) {
						return res.status(401).json({ msg: "Credenciais inválidas" });
					}

					let jwtPayload = {
						id: result.id,
						name: result.name,
						email: result.email,
						type: result.type,
						isActive: result.isActive,
					};

					let token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
						expiresIn: "12h",
					});

					return res.status(200).json({ jwtPayload, token });
				} else {
					return res.status(400).json({
						msg: "O usuario não existe ou foi desativado na base de dados",
					});
				}
			})
			.catch(() => {});
	},

	loginWithToken(req, res, next) {
		const { token } = req.body;

		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ msg: "failed to authenticate token!" });
			}
		});
		res.status(200).json({ msg: "Token validado" });
	},
};
