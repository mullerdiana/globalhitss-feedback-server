require("dotenv").config();

const jwt = require("jsonwebtoken");
const { Bearer } = require("permit");

const permit = new Bearer();

module.exports = {
	auth(req, res, next) {
		// Recebe a informação de token por bearer
		const token = permit.check(req);

		// Se o token não for infomado, retorna mensagem negativa
		if (!token) {
			permit.fail(res);
			return res.status(401).json({ error: "authentication required!" });
		}

		// Se o token for informado, mas não for igual, retorna mensagem negativa
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) {
				permit.fail(res);
				return res.status(401).json({ error: "failed to authenticate token!" });
			}

			// Salva o user em req.user
			req.email = decoded.email;
			next();
		});
	},
};
