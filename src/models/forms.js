const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Forms = sequelize.define("forms", {
    title: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    type: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
});

Forms.associate = (models) => {
    Forms.belongsToMany(models.Users, {
        through: "employees_forms",
        as: "Form_Employee",
        foreignKey: "form_id",
    });

    Forms.belongsTo(models.Users, {
        as: "Form_User",
        foreignKey: "manager_id",
    });
};

module.exports = Forms;
