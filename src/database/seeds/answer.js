const Answers = require("../../models/answers");

Answers.create({
    value: "Resposta 1",
    employee_id: 3,
    question_id: 1,
});

Answers.create({
    value: "Opção 2",
    employee_id: 3,
    question_id: 2,
});
