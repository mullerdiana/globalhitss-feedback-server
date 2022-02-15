const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Self_evaluation = sequelize.define("self_evaluation", {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    form_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_selectable: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
});

Self_evaluation.associate = (models) => {
    Self_evaluation.belongsTo(models.Users, {
        as: "User",
        foreignKey: "user_id",
    });
};

module.exports = Self_evaluation;
