var express = require('express');
var router = express.Router();

router.get('/',function (req, res) {
  return res.send("Nothing here but us trees.");
});

router.get("/test", (req, res) => {
  res.json({ message: "Testing."});
});

module.exports = router;
