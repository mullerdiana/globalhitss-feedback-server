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
const loginRoutes = require("./src/routes/login.routes.js");
const employees_FormsRoutes = require("./src/routes/employees_forms.routes.js");
const authentication = require("./src/middleware/auth");

app.use(cors());
app.use(express.json());
app.use(loginRoutes);
app.use("/employees", authentication.auth, employeesRoutes);
app.use("/managers", managersRoutes);
app.use("/teams", teamsRoutes);
app.use("/forms", authentication.auth, formsRoutes);
app.use("/questions", authentication.auth, questionsRoutes);
app.use("/options", authentication.auth, multipleChoiceOptionsRoutes);
app.use("/answers", authentication.auth, answersRoutes);
app.use("/employees-forms", authentication.auth, employees_FormsRoutes);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "production")
        res.status(500).json({ msg: "internal server error" });
    else return next(err);
});

app.listen(PORT);
