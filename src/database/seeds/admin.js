require("dotenv").config();

const bcrypt = require("bcrypt");

const Users = require("../../models/users");

Users.create({
    name: "Admin",
    email: "admin@globalhitss.com.br",
    password: bcrypt.hashSync("123456", 10),
    type: 0,
});
