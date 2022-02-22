const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Self_evaluations = sequelize.define("self_evaluations", {
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: "users",
            key: "id",
        },
    },
    manager: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    strong: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    improve: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    knowledge: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    skills: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
    attitudes: {
        type: Sequelize.STRING(4000),
        allowNull: false,
    },
});

Self_evaluations.associate = (models) => {
    Self_evaluations.belongsTo(models.Users, {
        as: "User",
        foreignKey: "user_id",
    });
};

module.exports = Self_evaluations;
