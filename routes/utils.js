var fs = require('fs');
var PDFDocument = require('pdfkit');
var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var format = 'dd-mm-yyyy hh:MM TT';
var format1 = 'dd-mm-yyyy hh:MM:ss TT';
let google = require('googleapis');
let sheetAuth = require('../sheetAuth');
//var Payment = require('../schema/payment');


exports.resSheet = function (result) {

    sheetAuth.authenticate().then((auth) => {


        var sheetID;
        var ra;
        var value;
 
                sheetID = process.env.SHEET_REGISTERATION;
                ra = 'RES';
                value =
                    [
                        '' + (new Date()),
                        result.name,
                        result.gender,
                        result.email,
                        result.phoneNumber,
                        result.college,            
                        result.city,
                        result.year,
                    ];
                
        console.log(value);
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.append({
            auth: auth,
            spreadsheetId: sheetID,
            range: ra + '!A3:B',
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [value]
            }
        }, (err, response) => {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            } else {
                console.log("Appended");
            }
        });

    });
};