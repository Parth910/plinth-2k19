var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');
var Utils = require('./utils');
var Payment = require('../schema/payment');
var fs = require('fs');
var PDFDocument = require('pdfkit');

router.get('/generate/:id', Verify.verifyOrdinaryUser, function (req, res, next) {
  if (req.decoded.sub === "") {
    isLoggedIn = false;
    res.redirect('/404');
  }
  else {
    User.findOne({ 'email': req.decoded.sub }, function (err, user) {
      isLoggedIn = user.valid;
      // if there are any errors, return the error
      if (err)
        return done(err);
      // check to see if theres already a user with that email
      if (user) {

        Payment.findOne({ 'orderId': req.params.id }, function (err, payment) {
          if (err)
            return done(err);


          isUser = false;
          if (payment) {
            for (var i = 0; i < payment.team.length; i++) {
              if (payment.team[i].email == req.decoded.sub) {
                isUser = true;
              }
            }

          }    else {
            res.redirect('/404');
          }


          if (isUser) {

            var doc = Utils.pdf(payment);

            setTimeout(function () {
              fs.readFile(doc, function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
                setTimeout(function () {
                  Utils.delpdf(doc);
                }, 4000);

              });
            }, 2000);
          }

          else {
            res.redirect('/404');
          }
        });


      }
    });


  }




});

router.get('/view/:id', Verify.verifyOrdinaryUser, function (req, res, next) {
  if (req.decoded.sub === "") {
    isLoggedIn = false;
    res.redirect('/404');
  }
  else {
    User.findOne({ 'email': req.decoded.sub }, function (err, user) {
      isLoggedIn = user.valid;
      // if there are any errors, return the error
      if (err)
        return done(err);
      // check to see if theres already a user with that email
      if (user) {

        Payment.findOne({ 'orderId': req.params.id }, function (err, payment) {
          if (err)
            return done(err);


          isUser = false;
          if (payment) {
            for (var i = 0; i < payment.team.length; i++) {
              if (payment.team[i].email == req.decoded.sub) {
                isUser = true;
              }
            }

          } else {
            res.redirect('/404');
          }


          if (isUser) {

            var doc = Utils.pdfView(payment);

            setTimeout(function () {
              fs.readFile(doc, function (err, data) {
                res.contentType("application/pdf");
                res.send(data);
                setTimeout(function () {
                  Utils.delpdf(doc);
                }, 4000);

              });
            }, 2000);
          }

          else {
            res.redirect('/404');
          }
        });


      }
    });


  }




});




module.exports = router;