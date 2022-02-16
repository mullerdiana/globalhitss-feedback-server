const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Questions = sequelize.define("questions", {
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

Questions.associate = (models) => {
    Questions.belongsTo(models.Forms, {
        as: "Forms",
        foreignKey: "form_id",
    });
    Questions.hasMany(models.Options, {
        as: "Question_Options",
        foreignKey: "question_id",
    });
};

module.exports = Questions;
