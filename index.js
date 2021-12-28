require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.DATABASE_PORT || 5000;
const app = express();

const employeesRoutes = require("./src/routes/employees.routes.js");
const managersRoutes = require("./src/routes/managers.routes.js");
const teamsRoutes = require("./src/routes/teams.routes.js");
const formsRoutes = require("./src/routes/forms.routes.js");
const questionsRoutes = require("./src/routes/questions.routes.js");
const multipleChoiceOptionsRoutes = require("./src/routes/multiple_choice_options.routes");
const answersRoutes = require("./src/routes/answers.routes.js");
const employees_AnswersRoutes = require("./src/routes/employees_answers.routes.js");
const loginRoutes = require("./src/routes/login.routes.js");
const employees_FormsRoutes = require("./src/routes/employees_forms.routes.js");

app.use(cors());
app.use(express.json());
app.use(loginRoutes);
app.use("/colaboradores", employeesRoutes);
app.use("/gestores", managersRoutes);
app.use("/times", teamsRoutes);
app.use("/formularios", formsRoutes);
app.use("/perguntas", questionsRoutes);
app.use("/opcoes", multipleChoiceOptionsRoutes);
app.use("/respostas", answersRoutes);
app.use("/enviarresposta", employees_AnswersRoutes);
app.use("/enviarforms", employees_FormsRoutes);

//error handling
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === "production")
		res.status(500).json({ error: "internal server error" });
	else return next(err);
});

app.listen(PORT);
