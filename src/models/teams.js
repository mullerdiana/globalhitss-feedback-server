//chamando o sequelize e o arquivo de configuraçao do database.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');
const Users = require('./users');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Teams = sequelize.define('teams', {
    nome: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    }
});

Teams.hasMany(Users, {
    foreignKey: 'idTeam',
    onUpdate: "CASCADE",
    as: "teamsUser",
})

// //envia a chave estrangeira idTime para o model usuarios
// const usuarios = require('./usuarios');
// Times.hasMany(usuarios, {
//     foreignKey: 'idTime',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     as: 'users'
// })

// //envia a chave estrangeira idTime para o model formularios
// const formularios = require('./formularios');
// Times.hasMany(formularios, {
//     foreignKey: 'idTime',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//     as: 'forms'
// })

module.exports = Teams;