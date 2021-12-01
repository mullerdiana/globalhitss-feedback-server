//chamando o sequelize e o arquivo de configuraçao do databese.js
const Sequelize = require('sequelize');
const sequelize = require('../database/sequelize');

// montando a estrutura da tabela no Sequelize.
// sequelize.define define a estrutura que a tabela deve possuir, passando o nome e os campos da tabela

const Answers = sequelize.define('answers', {
    idQuestion: {
        type: Sequelize.INTEGER,
        references: {
            model: 'question', // refers to table name
            key: 'id', // 'id' refers to column in table
        }
    },
    textAnswer: {
        allowNull: false,
        type: Sequelize.STRING(255),
        validate: {
            len: [3, 255] //define tamanho minimo e maximo do campo
        }
    },
    type: {
        allowNull: false,
        type: Sequelize.STRING(255),
        defaultValue: "text",
    }
});

//chave estrangeira id pergunta dentro da tabela respostas
// const respostas = require('./respostas');
// Answers.hasMany(respostas, {
//     foreignKey: 'idPergunta', onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'resps'
// })

module.exports = Answers;