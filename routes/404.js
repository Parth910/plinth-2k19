var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');



router.get('/*', Verify.verifyOrdinaryUser, function (req, res, next) {
    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.render('404', {
            "page": '404',
            "isLoggedIn": isLoggedIn,
        });
    } else {
        User.findOne({
            'email': req.decoded.sub
        }, function (err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user) {


                res.render('404', {
                    "page": '404',
                    "isLoggedIn": isLoggedIn,
                    "user": user
                });



            }
        });


    }




});


module.exports = router;