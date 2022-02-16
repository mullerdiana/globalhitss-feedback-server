const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Options = sequelize.define("options", {
    title: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
});

Options.associate = (models) => {
    Options.belongsTo(models.Questions, {
        as: "Option_Question",
        foreignKey: "question_id",
    });
};

module.exports = Options;
