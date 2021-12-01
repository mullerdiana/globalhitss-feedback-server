//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Users = sequelize.define('users', {
    name: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    },
    username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    email: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    type: {
        allowNull: false,
        type: Sequelize.STRING(20),
        validate: {
            len: [3, 20]
        }
    },
    idTeam: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'teams', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    }
});

// //chave estrangeira id avaliador dentro da tabela respostas
// const respostasAvaliador = require('./respostas');
// Usuarios.hasMany(respostasAvaliador, {
//     foreignKey: 'idAvaliador', 
//     onDelete: 'CASCADE', 
//     onUpdate: 'CASCADE', 
//     as: 'respsAvaliador'
// })

// //chave estrangeira id avaliado dentro da tabela respostas
// const respostasAvaliado = require('./respostas');
// Usuarios.hasMany(respostasAvaliado, {
//     foreignKey: 'idAvaliado', 
//     onDelete: 'CASCADE', 
//     onUpdate: 'CASCADE', 
//     as: 'respsAvaliado'
// })

const init = async () => {
    await Users.sync();
  };
  
  init();

module.exports = Users;