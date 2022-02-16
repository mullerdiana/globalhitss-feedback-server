require("dotenv").config();

const bcrypt = require("bcrypt");

const Users = require("../../models/users");

Users.create({
    name: "Colaborador Teste",
    email: "colaboradorteste@globalhitss.com.br",
    password: bcrypt.hashSync("123456", 10),
    type: 1,
});
