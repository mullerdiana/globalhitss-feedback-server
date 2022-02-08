const express = require("express");
const multipleChoiceOptionsRoutes = express.Router();

const multipleChoiceOptionsController = require("../controllers/multiple_choice_options");

multipleChoiceOptionsRoutes.post(
    "/create",
    multipleChoiceOptionsController.Create
);
multipleChoiceOptionsRoutes.get(
    "/all",
    multipleChoiceOptionsController.SearchAll
);
multipleChoiceOptionsRoutes.get(
    "/get-by-question",
    multipleChoiceOptionsController.GetOptionsByQuestion
);
multipleChoiceOptionsRoutes.get(
    "/get-answer/:id",
    multipleChoiceOptionsController.SearchOne
);
multipleChoiceOptionsRoutes.delete(
    "/delete/:id",
    multipleChoiceOptionsController.Delete
);
multipleChoiceOptionsRoutes.put(
    "/edit/:id",
    multipleChoiceOptionsController.Update
);

module.exports = multipleChoiceOptionsRoutes;
