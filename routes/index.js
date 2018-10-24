var express = require('express');
var router = express.Router();
 /* GET home page. */
router.get('/',function(req, res, next) {
    res.render('index');
  
});
router.get('/sop',function(req, res, next) {
    res.render('sop');
  
});

module.exports = router;