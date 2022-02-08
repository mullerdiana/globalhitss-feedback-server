const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Options = sequelize.define("options", {
    title: {
        allowNull: false,
        type: Sequelize.STRING(4000),
    },
});

Options.associate = (models) => {
    Options.belongsTo(models.Questions, {
        as: "Option_Question",
        foreignKey: "question_id",
    });
};

module.exports = Options;
