var express = require('express');
var router = express.Router();
var passport = require('passport');
var google = require('../authenticate').google;
var facebook = require('../authenticate').facebook;
var facebookValidate = require('../authenticate').facebookValidate;
var googleValidate = require('../authenticate').googleValidate;
var GoogleAuth = require('google-auth-library');
var Verify = require('./verify');
var User = require('../schema/user');
var googleSetting = require('../config/auth').googleAuth;
// var Utils = require('./utils');

/* GET users listing. */
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }), function (req, res) { });
// the callback after google has authenticated the user

router.get('/auth/google/callback', function (req, res, next) {
    passport.authenticate('google', function (err, user, info) {
      
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }

        req.logIn(user, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            var token = Verify.getToken(user);

            res.cookie('access-token', token, { httpOnly: true, secure: false });
            if (user.valid) {
                res.render('redirect', {
                    "page": 'redirect',
                    isLoggedIn: true,
                    valid: user.valid,
                    user: user
                });
            } else {
                res.render('redirect', {
                    "page": 'redirect',
                    isLoggedIn: false,
                    valid: user.valid,
                    user: user
                });
            }


        });
    })(req, res, next);
});



/****************

facebook

*****************/


router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
    function (req, res) { });

router.get('/auth/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function (err, user, info) {
       
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            var token = Verify.getToken(user);
            res.cookie('access-token', token, { httpOnly: true, secure: false });
            if (user.valid) {
                res.render('redirect', {
                    "page": 'redirect',
                    isLoggedIn: true,
                    valid: user.valid,
                    user: user
                });
            } else {
                res.render('redirect', {
                    "page": 'redirect',
                    isLoggedIn: false,
                    valid: user.valid,
                    user: user
                });
            }

        });
    })(req, res, next);
});

router.post('/user_register_complete', Verify.verifyOrdinaryUser, function (req, res) {
    
    console.log(req.decoded.sub);
    var param_data = JSON.parse(req.body.postData);
    var update = {
        phoneNumber: param_data.phoneNumber,
        college: param_data.college,
        year: param_data.year,
        city: param_data.city,
        gender: param_data.gender,
        events: ['init'],
        rEvents: ['init'],
        valid: true,
    };
    console.log(update);
  User.findOneAndUpdate({ 'email': req.decoded.sub }, update, { new: true }, function (err, user) {
    if (err) {
        console.log('errr');
         
    }
    if (user) {
        res.cookie('access-token', Verify.getToken(user), { httpOnly: true, secure: false });
        Utils.resSheet(user);
        res.json({status: true});
        return;
        
    } else {
        res.json({status: false});
        return;
        
    }
});
});


router.get('/logout', Verify.verifyOrdinaryUser, function (req, res) {
    res.clearCookie("access-token");
    res.redirect('/');
});

module.exports = router;
