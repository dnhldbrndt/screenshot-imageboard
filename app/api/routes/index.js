var express = require('express');
var router = express.Router();

 

// Get the screenshot list available in the db
router.get('/',function (req, res) {
  //Write your code here
  return res.send("Nothing here but us trees.");
});
 

router.get("/test", (req, res) => {
  res.json({ message: "I tell him to eat the cookie beacuse it's good form."});
});


 




module.exports = router;
