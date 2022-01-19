var express = require('express');
var router = express.Router();
const { TextADactylographier } = require("../model/text");

const textModel = new TextADactylographier();

/* GET users listing. */
router.get("/:level", function (req, res) {

  const text = textModel.getRandomText(req.params.level);
  // Send an error code '404 Not Found' if the pizza was not found
  if (!text) return res.status(404).end();

  return res.json(text);
});

router.post("/", function (req, res) {
  // Send an error code '400 Bad request' if the body parameters are not valid
  if (
    !req.body ||
    (req.body.hasOwnProperty("level") && req.body.level.length === 0) ||
    (req.body.hasOwnProperty("content") && req.body.content.length === 0)
  )
    return res.status(400).end();


  const text = textModel.addOne(req.body);

  return res.json(text);
});

module.exports = router;
