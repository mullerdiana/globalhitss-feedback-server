require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.DATABASE_PORT || 5000;
const app = express();

const usersRoutes = require("./src/routes/users.routes.js");
const managersRoutes = require("./src/routes/managers.routes.js");
const teamsRoutes = require("./src/routes/teams.routes.js");
const formsRoutes = require("./src/routes/forms.routes.js");
const questionsRoutes = require("./src/routes/questions.routes.js");
const answersRoutes = require("./src/routes/answers.routes.js");

app.use(cors());
app.use(express.json());
app.use("/usuarios", usersRoutes);
app.use("/gestores", managersRoutes);
app.use("/times", teamsRoutes);
app.use("/formularios", formsRoutes);
app.use("/perguntas", questionsRoutes);
app.use("/respostas", answersRoutes);

//error handling
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === "production")
		res.status(500).json({ error: "internal server error" });
	else return next(err);
});

app.listen(PORT);
