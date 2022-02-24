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
        type: Sequelize.INTEGER,
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
    current_position: {
        type: Sequelize.STRING(500),
        allowNull: true,    
    },
    admission_date: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },
    project: {
        type: Sequelize.STRING(500),
        allowNull: true,
    },
    activities: {
        type: Sequelize.STRING(500),
        allowNull: true,
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

    Users.hasMany(models.Self_evaluation, {
        as: "User_Self_evaluation",
        foreignKey: "user_id",
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
