const Sequelize = require("sequelize");
const sequelize = require("../database/sequelize");

const Teams = sequelize.define("teams", {
    name: {
        allowNull: true,
        type: Sequelize.STRING(255),
    },
    manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    is_active: {
        type: Sequelize.INTEGER,
    },
});

Teams.associate = (models) => {
    Teams.belongsTo(models.Users, {
        as: "Team_User",
        foreignKey: "manager_id",
    });
};

module.exports = Teams;
