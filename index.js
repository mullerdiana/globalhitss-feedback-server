require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.DATABASE_PORT || 5000;
const app = express();

const swaggerUiExpress = require("swagger-ui-express");
const usersRoutes = require("./src/routes/users.routes.js");
const teamsRoutes = require("./src/routes/teams.routes.js");
const formsRoutes = require("./src/routes/forms.routes.js");
const questionsRoutes = require("./src/routes/questions.routes.js");
const optionsRoutes = require("./src/routes/options.routes");
const answersRoutes = require("./src/routes/answers.routes.js");
const loginRoutes = require("./src/routes/login.routes.js");
const employees_FormsRoutes = require("./src/routes/employees_forms.routes.js");
const employees_managersRoutes = require("./src/routes/employees_managers.routes");
const employees_teamsRoutes = require("./src/routes/employees_teams.routes");
const authentication = require("./src/middleware/auth");
const swaggerFile = require("./swagger.json");

app.use(cors());
app.use(express.json());
app.use(loginRoutes);
app.use("/users", usersRoutes);
app.use("/teams", teamsRoutes);
app.use("/forms", formsRoutes);
app.use("/questions", questionsRoutes);
app.use("/options", optionsRoutes);
app.use("/answers", answersRoutes);
app.use("/employees-forms", employees_FormsRoutes);
app.use("/employees-managers", employees_managersRoutes);
app.use("/employees-teams", employees_teamsRoutes);

app.use(
    "/api-docs",
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(swaggerFile)
);

app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "production")
        res.status(500).json({ msg: "internal server error" });
    else return next(err);
});

app.listen(PORT);
