const Questions = require("../../models/questions");

Questions.create({
    title: "Pergunta Teste - Texto",
    is_selectable: 0,
    form_id: 1,
});

Questions.create({
    title: "Pergunta Teste - Múltipla Escolha",
    is_selectable: 1,
    form_id: 1,
});
