const express = require("express");
const multipleChoiceOptionsRoutes = express.Router();

const multipleChoiceOptionsController = require("../controllers/multiple_choice_options");

multipleChoiceOptionsRoutes.post(
	"/cadastrar",
	multipleChoiceOptionsController.Create
);
multipleChoiceOptionsRoutes.get(
	"/todas",
	multipleChoiceOptionsController.SearchAll
);
multipleChoiceOptionsRoutes.get(
	"/search",
	multipleChoiceOptionsController.SearchId
);
multipleChoiceOptionsRoutes.get(
	"/resposta/:id",
	multipleChoiceOptionsController.SearchOne
);
multipleChoiceOptionsRoutes.delete(
	"/deletar/:id",
	multipleChoiceOptionsController.Delete
);
multipleChoiceOptionsRoutes.put(
	"/editar/:id",
	multipleChoiceOptionsController.Update
);

module.exports = multipleChoiceOptionsRoutes;
