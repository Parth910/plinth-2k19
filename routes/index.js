var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');

/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('index', {
            "page" : 'home',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('index',{
                    "page" : 'home',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
 
  
});

router.get('/competitions', Verify.verifyOrdinaryUser, function (req, res, next) {


    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.render('competitions', {
            "page": 'competitions',
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
                res.render('competitions', {
                    "page": 'competitions',
                    "isLoggedIn": isLoggedIn,
                    "user": user,

                });
            }
        });
    }


});

router.get('/workshops', Verify.verifyOrdinaryUser ,function(req, res, next) {
    //var workshopUrl = require('../data/workshops').workshopUrl;
    
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('workshops', {
            "page" : 'workshops',
            "isLoggedIn" : isLoggedIn,
            //"workshopUrl" : workshopUrl.workshops,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
           
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('workshops',{
                    "page" : 'workshops',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                    //"workshopUrl" : workshopUrl.workshops,
                });
            }
        });
    }
  
  
});

router.get('/mun', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('mun', {
            "page" : 'mun',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
        
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('mun',{
                    "page" : 'mun',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/talks', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('talks', {
            "page" : 'talks',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('talks',{
                    "page" : 'talks',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/sop', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('sop', {
            "page" : 'sop',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('sop',{
                    "page" : 'sop',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});


router.get('/gallery', Verify.verifyOrdinaryUser ,function(req, res, next) {
   
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('gallery', {
            "page" : 'gallery',
            "isLoggedIn" : isLoggedIn,
            
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('gallery',{
                    "page" : 'gallery',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                   
                });
            }
        });
    }
  
});

router.get('/sponsors', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('sponsors', {
            "page" : 'sponsors',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('sponsors',{
                    "page" : 'sponsors',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/faqs', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('faqs', {
            "page" : 'faqs',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('faqs',{
                    "page" : 'faqs',
                    "isLoggedIn" : isLoggedIn,
                    "user" :user
                });
            }
        });
    }
  
  
});

router.get('/team', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('team', {
            "page" : 'team',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('team',{
                    "page" : 'team',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/terms', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('terms', {
            "page" : 'terms',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('terms',{
                    "page" : 'terms',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/archive', Verify.verifyOrdinaryUser, function (req, res, next) {
    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.render('archive', {
            "page": 'archive',
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
                res.render('archive', {
                    "page": 'archive',
                    "isLoggedIn": isLoggedIn,
                    "user": user
                });
            }
        });
    }


});

router.get('/profile', Verify.verifyOrdinaryUser, function (req, res, next) {

    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.redirect(301, '/');
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
                res.render('profile', {
                    "page": 'profile',
                    "isLoggedIn": isLoggedIn,
                    "user": user
                });
            }
        });
    }


});

router.get('/ca', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('ca', {
            "page" : 'ca',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
        
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('ca',{
                    "page" : 'ca',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});


module.exports = router;