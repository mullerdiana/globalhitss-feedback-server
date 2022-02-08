const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Users = sequelize.define("users", {
    name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(100),
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(100),
    },
    type: {
        allowNull: false,
        type: Sequelize.INTEGER(100),
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
});

Users.associate = (models) => {
    Users.hasMany(models.Teams, {
        as: "User_Team",
        foreignKey: "manager_id",
    });

    Users.hasMany(models.Forms, {
        as: "User_Form",
        foreignKey: "manager_id",
    });

    Users.belongsToMany(models.Forms, {
        through: "employees_forms",
        foreignKey: "employee_id",
        as: "Employee_Form",
    });

    Users.belongsToMany(models.Users, {
        through: "employees_managers",
        foreignKey: "manager_id",
        as: "Manager_Employee",
    });

    Users.belongsToMany(models.Users, {
        through: "employees_managers",
        foreignKey: "employee_id",
        as: "Employee_Manager",
    });
};

module.exports = Users;