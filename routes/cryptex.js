var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Cryptex = require('../schema/cryptex');
var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/media/cryptex/')
    },
    filename: function (req, file, cb) {
        cb(null, "" + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('image')

/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser, function (req, res, next) {
    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.render('cryptex', {
            "page": 'cryptex',
            "isLoggedIn": isLoggedIn,
            "num": randomNum()
        });
    }
    else {
        User.findOne({ 'email': req.decoded.sub }, function (err, user) {
            isLoggedIn = user.valid;
            if (user.cryptex.level === undefined) var newUser = true;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email

            var timeframe = false;

            if((new Date().getTime()) > 1547188199000){
                timeframe = true;
            }

            if (user) {
                res.render('cryptex', {
                    "page": 'cryptex',
                    "isLoggedIn": isLoggedIn,
                    "user": user,
                    "num": randomNum(),
                    "newUser": newUser,
                    "time" : timeframe,
                });
            }
        });
    }


});

router.post('/start', Verify.verifyOrdinaryUser, function (req, res) {
    var timestamp = new Date().getTime();

    User.findOneAndUpdate({ 'email': req.decoded.sub }, { 'cryptex.level': 1, 'cryptex.updateTime': timestamp }, { upsert: true, 'new': true }, function (err, user) {
        if (err) {
            console.log(err);
            return;
        }
        // check to see if theres already a user with that email
        if (user) {
            res.redirect('/cryptex/play');
            return;
        }
    });
});


router.get('/dashboard', Verify.verifyOrdinaryUser, function (req, res) {
    if (req.decoded.sub !== "admin@plinth.in") {
        isLoggedIn = false;
        res.end('You are not authorized!!');
    }

    else {
        User.findOne({ 'email': req.decoded.sub }, function (err, user) {
            isLoggedIn = user.valid;
            if (err)
                return done(err);
            if (user) {
                Cryptex.find({}, function (err, doc) {
                    if (doc.length == 0) {
                        console.log(doc);
                    }

                    if (err) throw err;
                    else {
                        res.render('cryptexAdmin', {
                            "page": 'cryptex',
                            "isLoggedIn": isLoggedIn,
                            "user": user,
                            "doc": doc,
                            "num": randomNum(),
                        });
                    }
                })
            }
        });
    }
});

router.post('/add', Verify.verifyOrdinaryUser, function (req, res) {
    if (req.decoded.sub !== "admin@plinth.in") {
        isLoggedIn = false;
        res.end('You are not authorized!!');
    }
    if (req.decoded.sub == "") {
        isLoggedIn = false;
        res.redirect('/404');
    }
    else {

        upload(req, res, function (err, data) {
            if (err) {
                res.end('Error!!');
                return
            }
            var level = req.body.level;
            var answer = [];
            var spl = (req.body.answer).split(',');
            for (var i = 0; i < spl.length; i++) {
                answer.push(spl[i].trim());
            }
            var image = req.file.destination + req.file.filename;
            var format = req.body.format;
            var update = { $set: { 'image': image, 'answer': answer, 'format': format } };
            var options = { upsert: true };
            Cryptex.update({ 'level': level }, update, options, function (err, doc) {
                if (err) throw err;
                else {
                    console.log(doc);
                    res.redirect('/cryptex/dashboard');
                    return;
                }
            })

        })

    }
});

router.get('/play', Verify.verifyOrdinaryUser, function (req, res) {
    var limitLevel = 28;
    if (req.decoded.sub === "") {
        isLoggedIn = false;
        res.redirect('/cryptex');
        return
    }
    else {
        User.findOne({ 'email': req.decoded.sub }, function (err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user) {
                if (user.cryptex.level === undefined) {
                    console.log('level undefined');
                    res.redirect('/cryptex');
                    return;
                }
                if (user.cryptex.level === limitLevel) {
                    res.render('cryptexPlay', {
                        "page": 'cryptex',
                        "isLoggedIn": isLoggedIn,
                        "user": user,
                        "num": randomNum(),
                    });
                } else {
                    Cryptex.findOne({ 'level': user.cryptex.level }, function (err, doc) {
                        if (err) {
                            console.log(err);
                            res.end('Internal server Error')
                            return;
                        }
                        else {
                            res.render('cryptexPlay', {
                                "page": 'cryptex',
                                "isLoggedIn": isLoggedIn,
                                "user": user,
                                "doc": doc,
                                "num": randomNum()
                            });
                        }
                    })
                }

            }
        });
    }
});


router.post('/submitC', Verify.verifyOrdinaryUser, function (req, res) {

    var check = false;
    if (req.decoded.sub === "") {
        res.json({ response: false })
        return;
    }
    else {
        User.findOne({ 'email': req.decoded.sub }, function (err, user) {
            if (err) {
                console.log(err);
                res.json({ response: false });
                return;
            }
            if (user) {
                
                Cryptex.findOne({ 'level': user.cryptex.level }, function (err, doc) {
                    if (err) {
                        console.log(err);
                        res.json({ response: false });
                        return;
                    }
                    else {
                        for (var k = 0; k < doc.answer.length; k++) {
                            if (doc.answer[k].toLowerCase() === req.body.answer.toLowerCase()) {
                                var newLevel = user.cryptex.level + 1;
                                var timestamp = new Date().getTime();
                                check = true;
                                break;
                            }
                        }
                        if(check){
                            User.findOneAndUpdate({ 'email': req.decoded.sub }, { 'cryptex.level': newLevel, 'cryptex.updateTime': timestamp }, function (err, user) {
                                if (err) {
                                    res.json({ response: false });
                                    return;
                                }
                              
                                if (user) {
                                    res.json({ response: true });
                                    return;
                                }
                                else {
                                    res.json({ response: false });
                                    return;
                                }
    
    
                            })
                        }else {
                            res.json({ response: false });
                            return;
                        }
                      


                    }
                })
            }
        })
    }
});


router.get('/leaderboard/:page?', Verify.verifyOrdinaryUser ,function(req, res) {
    var usersProjection = {
        _id: false,
        name           : true,
        cryptex        : true,
        college        : true,
        email          : true,
    };

    var perPage = 5;
    var page = req.params.page || 1;
    if(page < 1 ){
        res.redirect('/cryptex/leaderboard');
    }
    page = Number(page);

  if(req.decoded.sub === ""){
      isLoggedIn = false;
      User.find({'cryptex.level' : { $exists : true}}, usersProjection, {sort : {'cryptex.level' : -1, 'cryptex.updateTime' : 1 }}).skip((perPage * page) - perPage)
      .limit(perPage).exec( function(err,results){
        User.find({'cryptex.level' : { $exists : true}}, usersProjection, {sort : {'cryptex.level' : -1, 'cryptex.updateTime' : 1 }}).count().exec(function(err, count) {
            
            res.render('cryptexLeaderboard', {
              "page": "cryptex",
              "isLoggedIn" : isLoggedIn,
              "results" : results,
              "num": randomNum(),
              "current": page,
              "pages": Math.ceil(count / perPage),
          });
        })
      })
      return
  }
  else {
      User.findOne({'email' : req.decoded.sub }, function(err, user) {
          isLoggedIn = user.valid;
          if (err)
              return done(err);
          if (user){
              User.find({'cryptex.level' : { $exists : true}}, usersProjection, {sort : {'cryptex.level' : -1, 'cryptex.updateTime' : 1 }}).skip((perPage * page) - perPage)
              .limit(perPage).exec(  function(err,results){
                User.find({'cryptex.level' : { $exists : true}}, usersProjection, {sort : {'cryptex.level' : -1, 'cryptex.updateTime' : 1 }}).count().exec(function(err, count) {
                  res.render('cryptexLeaderboard',{
                      "page": "cryptex",
                      "isLoggedIn" : isLoggedIn,
                      "user" : user,
                      "results" : results,
                      "num": randomNum(),
                      "current": page,
                      "pages": Math.ceil(count / perPage),
                  });
                })
              })
          }
      });
  }
});

var randomNum = function () {

    return Math.floor((Math.random() * 6) + 1);
}

module.exports = router;
