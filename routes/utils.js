var fs = require('fs');
var PDFDocument = require('pdfkit');
var nodemailer = require('nodemailer');
var dateFormat = require('dateformat');
var format = 'dd-mm-yyyy hh:MM TT';
var format1 = 'dd-mm-yyyy hh:MM:ss TT';
let google = require('googleapis');
let sheetAuth = require('../sheetAuth');
var Payment = require('../schema/payment');


exports.pdf = function (result) {

    var doc = new PDFDocument({
        size: 'A4',
        info: {
            Title: '' + result.event.eventName + ' Payment Receipt',
            Author: 'Plinth',
            Creator: 'Swarnim',
        }
    });

    var path = './data/' + Math.floor((Math.random() * 10) + 1) + '' + result.orderId + '.pdf';
    doc.image('./public/media/plinth-logo.png', 25, 50, { height: 48 })
    doc.image('./public/media/lnmiit-logo.jpeg', 475, 50, { height: 48 })

    doc.font('./public/fonts/Righteous-Regular.ttf', 28)
        .text('plinth 2019', 50, 50, { align: 'center' })
        .moveDown(.1)
        .font('./public/fonts/Oxygen-Regular.ttf', 12)
        .text('19th - 20th January', { align: 'center' })

    doc.moveTo(25, 110)
        .lineTo(575, 110)
        .stroke()

    doc.font('./public/fonts/Oxygen-Bold.ttf', 16)
        .text('Payment Receipt', 50, 130, { align: 'center', underline: true })

    doc.font('./public/fonts/Roboto-Bold.ttf', 16)
        .text('Transaction Details', 50, 160, { underline: true })

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Transaction ID ', 50, 190)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + result.tranId, 160, 190)

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Order ID ', 50, 220)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + result.orderId, 160, 220)


    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Event Name ', 50, 250)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + result.event.eventName, 160, 250, { width: '140' })

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Date ', 300, 250)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + dateFormat(result.date.paidAt, format), 370, 250)


    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Amount ', 50, 280)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': INR ' + result.amount + ' /-', 160, 280)

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Status ', 300, 280)
    if (result.status === 'TXN_SUCCESS') {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Success', 370, 280)
    } else if (result.status === 'TXN_FAILURE') {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Failed', 370, 280)
    } else {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Open', 370, 280)
    }

    if (result.status === 'TXN_SUCCESS') {
        doc.font('./public/fonts/Roboto-Bold.ttf', 16)
            .text('Event Details', 50, 300, { underline: true })

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Organizer ', 50, 320)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Plinth, LNMIIT Jaipur', 140, 320)

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Venue ', 50, 350)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .fillColor('blue')
            .text(': The LNM Institute of Information Technology, Jaipur, India', 140, 350, { link: 'https://goo.gl/maps/g9nB7pgbRio' })
            .fillColor('black')

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Event Link ', 50, 380)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .fillColor('blue')
            .text(': https://plinth.in', 140, 380, { link: 'https://plinth.in' })
            .fillColor('black')

        if (result.event.payName === 'SIF') {
            if (result.team[0].type == 'Startup') {
                doc.font('./public/fonts/Roboto-Bold.ttf', 16)
                    .text('Startup Details', 50, 420, { underline: true })
            } else {
                doc.font('./public/fonts/Roboto-Bold.ttf', 16)
                    .text('Participants Details', 50, 420, { underline: true })
            }
        } else {
            doc.font('./public/fonts/Roboto-Bold.ttf', 16)
                .text('Participants Details', 50, 420, { underline: true })
        }


        if (result.event.eventName === 'MUN' || result.event.eventName === 'mun') {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Name ', 50, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].name, 160, 450, { width: '140' })

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Institute ', 300, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].college, 370, 450)




            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Delegation ', 50, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].delegation, 160, 480)

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Email ', 300, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].email, 370, 480)

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Committee ', 50, 510)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].committee, 160, 510)

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Portfolio ', 300, 510)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].portfolio, 370, 510)



        } else if (result.event.payName === 'SIF') {

            if (result.team[0].type == 'Startup') {
                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('StartUp Name ', 50, 450)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].startupName, 160, 450)


                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Name ', 50, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].name, 160, 480, { width: '140' })

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Email ', 300, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 12)
                    .text(': ' + result.team[0].email, 370, 480)

                for (var i = 0; i < result.team[0].domains.length; i++) {

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Domain ', 50, 480 + 30 * (i + 1))
                        .font('./public/fonts/Oxygen-Regular.ttf', 14)
                        .text(': ' + result.team[0].domains[i], 160, 480 + 30 * (i + 1))

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Interns ', 300, 480 + 30 * (i + 1))
                        .font('./public/fonts/Oxygen-Regular.ttf', 12)
                        .text(': ' + result.team[0]['' + (result.team[0].domains[i]).toLowerCase()], 370, 480 + 30 * (i + 1))


                }

            } else {
                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Name ', 50, 450)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].name, 160, 450, { width: '140' })

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Institute ', 300, 450)
                    .font('./public/fonts/Oxygen-Regular.ttf', 12)
                    .text(': ' + result.team[0].college, 370, 450)




                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Year ', 50, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].year, 160, 480)

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Email ', 300, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 12)
                    .text(': ' + result.team[0].email, 370, 480)

            }


        } else if (result.event.clubName === 'Workshops' || result.event.payName === 'UNE') {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Name ', 50, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].name, 160, 450, { width: '140' })

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Institute ', 300, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].college, 370, 450)




            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Email ', 50, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' +  result.team[0].email, 160, 480)

         
        } else {

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Team Name ', 50, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.teamName, 160, 450, { width: '140' })

            if (result.teamSize != 1) {
                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Team Size ', 300, 450)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.teamSize, 370, 450)

                for (var i = 0; i < result.teamSize; i++) {
                    if (i == 0) {
                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Leader Details', 50, 470)

                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Name ', 50, 490)
                            .font('./public/fonts/Oxygen-Regular.ttf', 14)
                            .text(': ' + result.team[i].name, 160, 490, { width: '140' })

                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Email ', 300, 490)
                            .font('./public/fonts/Oxygen-Regular.ttf', 12)
                            .text(': ' + result.team[i].email, 370, 490)
                    } else {
                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Member ' + i + ' Details', 50, 470 + 40 * i)

                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Name ', 50, 490 + 40 * i)
                            .font('./public/fonts/Oxygen-Regular.ttf', 14)
                            .text(': ' + result.team[i].name, 160, 490 + 40 * i, { width: '140' })

                        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                            .text('Email ', 300, 490 + 40 * i)
                            .font('./public/fonts/Oxygen-Regular.ttf', 12)
                            .text(': ' + result.team[i].email, 370, 490 + 40 * i)
                    }
                }
            } else {
                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Name ', 50, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].name, 160, 480, { width: '140' })

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Email ', 300, 480)
                    .font('./public/fonts/Oxygen-Regular.ttf', 12)
                    .text(': ' + result.team[0].email, 370, 480)

            }



        }
    }

    doc.font('./public/fonts/Oxygen-Bold.ttf', 12)
        .text('Note: ', 27, 715)
        .font('./public/fonts/Oxygen-Regular.ttf', 10)
        .text(' Please bring the printout of this receipt to the event OR show this on your smart phone at the venue.', 57, 717)
        .font('./public/fonts/Oxygen-Regular.ttf', 10)
        .text(' Need any help? Write us at payment@plinth.in. We will get back to you shortly!', 25, 735)


    doc.moveTo(25, 750)
        .lineTo(575, 750)
        .stroke()
    doc.font('./public/fonts/Oxygen-Bold.ttf', 10)
        .text('Receipt Generated At ', 25, 755)
        .font('./public/fonts/Oxygen-Regular.ttf', 10)
        .text(': ' + dateFormat((new Date()), format1), 130, 755)
        .font('./public/fonts/Oxygen-Regular.ttf', 10)
        .text('Page 1 of 1', 450, 755)


    // Stream contents to a file
    doc.pipe(
        fs.createWriteStream(path)
    )
        .on('finish', function () {
            console.log('PDF closed');
        });

    // Close PDF and write file.
    doc.end();

    return path;



};

exports.pdfView = function (result) {

    var doc = new PDFDocument({
        size: 'A4',
        info: {
            Title: '' + result.event.eventName + ' Registration Details',
            Author: 'Plinth',
            Creator: 'Swarnim',
        }
    });

    var path = './data/' + Math.floor((Math.random() * 10) + 1) + '' + result.orderId + '.pdf';
    doc.image('./public/media/plinth-logo.png', 25, 50, { height: 48 })
    doc.image('./public/media/lnmiit-logo.jpeg', 475, 50, { height: 48 })

    doc.font('./public/fonts/Righteous-Regular.ttf', 28)
        .text('plinth 2019', 50, 50, { align: 'center' })
        .moveDown(.1)
        .font('./public/fonts/Oxygen-Regular.ttf', 12)
        .text('19th - 20th January', { align: 'center' })

    doc.moveTo(25, 110)
        .lineTo(575, 110)
        .stroke()

    doc.font('./public/fonts/Oxygen-Bold.ttf', 16)
        .text('Registration Details', 50, 130, { align: 'center', underline: true })

    doc.font('./public/fonts/Roboto-Bold.ttf', 16)
        .text('Order Details', 50, 160, { underline: true })

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Order ID ', 50, 190)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + result.orderId, 160, 190)

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Status ', 300, 190)
    if (result.status === 'TXN_SUCCESS') {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Success', 370, 190)
    } else if (result.status === 'TXN_FAILURE') {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Failed', 370, 190)
    } else {
        doc.font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': Open', 370, 190)
    }

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Event Name ', 50, 220)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + result.event.eventName, 160, 220, { width: '140' })

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Date ', 300, 220)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': ' + dateFormat(result.date.createdAt, format), 370, 220)




    doc.font('./public/fonts/Roboto-Bold.ttf', 16)
        .text('Event Details', 50, 290, { underline: true })

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Organizer ', 50, 320)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .text(': Plinth, LNMIIT Jaipur', 140, 320)

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Venue ', 50, 350)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .fillColor('blue')
        .text(': The LNM Institute of Information Technology, Jaipur, India', 140, 350, { link: 'https://goo.gl/maps/g9nB7pgbRio' })
        .fillColor('black')

    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
        .text('Event Link ', 50, 380)
        .font('./public/fonts/Oxygen-Regular.ttf', 14)
        .fillColor('blue')
        .text(': https://plinth.in', 140, 380, { link: 'https://plinth.in' })
        .fillColor('black')

    if (result.event.payName === 'SIF') {
        if (result.team[0].type == 'Startup') {
            doc.font('./public/fonts/Roboto-Bold.ttf', 16)
                .text('Startup Details', 50, 420, { underline: true })
        } else {
            doc.font('./public/fonts/Roboto-Bold.ttf', 16)
                .text('Participants Details', 50, 420, { underline: true })
        }
    } else {
        doc.font('./public/fonts/Roboto-Bold.ttf', 16)
            .text('Participants Details', 50, 420, { underline: true })
    }

    if (result.event.eventName === 'MUN' || result.event.eventName === 'mun') {
        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Name ', 50, 450)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.team[0].name, 160, 450, { width: '140' })

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Institute ', 300, 450)
            .font('./public/fonts/Oxygen-Regular.ttf', 12)
            .text(': ' + result.team[0].college, 370, 450)




        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Delegation ', 50, 480)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.team[0].delegation, 160, 480)

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Email ', 300, 480)
            .font('./public/fonts/Oxygen-Regular.ttf', 12)
            .text(': ' + result.team[0].email, 370, 480)

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Committee ', 50, 510)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.team[0].committee, 160, 510)

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Portfolio ', 300, 510)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.team[0].portfolio, 370, 510)



    } else if (result.event.payName === 'SIF') {

        if (result.team[0].type == 'Startup') {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('StartUp Name ', 50, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].startupName, 160, 450)

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Name ', 50, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].name, 160, 480, { width: '140' })

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Email ', 300, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].email, 370, 480)


            for (var i = 0; i < result.team[0].domains.length; i++) {

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Domain ', 50, 480 + 30 * (i + 1))
                    .font('./public/fonts/Oxygen-Regular.ttf', 14)
                    .text(': ' + result.team[0].domains[i], 160, 480 + 30 * (i + 1))

                doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                    .text('Interns ', 300, 480 + 30 * (i + 1))
                    .font('./public/fonts/Oxygen-Regular.ttf', 12)
                    .text(': ' + result.team[0]['' + (result.team[0].domains[i]).toLowerCase()], 370, 480 + 30 * (i + 1))


            }

        } else {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Name ', 50, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].name, 160, 450, { width: '140' })

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Institute ', 300, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].college, 370, 450)




            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Year ', 50, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].year, 160, 480)

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Email ', 300, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].email, 370, 480)

        }


    } else if (result.event.clubName === 'Workshops' || result.event.payName === 'UNE') {
        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Name ', 50, 450)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.team[0].name, 160, 450, { width: '140' })

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Institute ', 300, 450)
            .font('./public/fonts/Oxygen-Regular.ttf', 12)
            .text(': ' + result.team[0].college, 370, 450)




            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Email ', 50, 480)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' +  result.team[0].email, 160, 480)

    } else {

        doc.font('./public/fonts/Roboto-Bold.ttf', 14)
            .text('Team Name ', 50, 450)
            .font('./public/fonts/Oxygen-Regular.ttf', 14)
            .text(': ' + result.teamName, 160, 450, { width: '140' })

        if (result.teamSize != 1) {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Team Size ', 300, 450)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.teamSize, 370, 450)

            for (var i = 0; i < result.teamSize; i++) {
                if (i == 0) {
                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Leader Details', 50, 470)

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Name ', 50, 490)
                        .font('./public/fonts/Oxygen-Regular.ttf', 14)
                        .text(': ' + result.team[i].name, 160, 490, { width: '140' })

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Email ', 300, 490)
                        .font('./public/fonts/Oxygen-Regular.ttf', 12)
                        .text(': ' + result.team[i].email, 370, 490)
                } else {
                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Member ' + i + ' Details', 50, 470 + 40 * i)

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Name ', 50, 490 + 40 * i)
                        .font('./public/fonts/Oxygen-Regular.ttf', 14)
                        .text(': ' + result.team[i].name, 160, 490 + 40 * i, { width: '140' })

                    doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                        .text('Email ', 300, 490 + 40 * i)
                        .font('./public/fonts/Oxygen-Regular.ttf', 12)
                        .text(': ' + result.team[i].email, 370, 490 + 40 * i)
                }
            }
        } else {
            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Name ', 50, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 14)
                .text(': ' + result.team[0].name, 160, 480, { width: '140' })

            doc.font('./public/fonts/Roboto-Bold.ttf', 14)
                .text('Email ', 300, 480)
                .font('./public/fonts/Oxygen-Regular.ttf', 12)
                .text(': ' + result.team[0].email, 370, 480)

        }



    }

    doc.moveTo(25, 750)
        .lineTo(575, 750)
        .stroke()
    doc.font('./public/fonts/Oxygen-Bold.ttf', 10)
        .font('./public/fonts/Oxygen-Regular.ttf', 10)
        .text('Page 1 of 1', 450, 755)





    // Stream contents to a file
    doc.pipe(
        fs.createWriteStream(path)
    )
        .on('finish', function () {
            console.log('PDF closed');
        });

    // Close PDF and write file.
    doc.end();

    return path;



};

exports.delpdf = function (path) {

    fs.unlink(path, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
    });
};

exports.mail = function (events) {

    var transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_EMAIL,
            pass: process.env.MAIL_PASS
        }
    });

    var add = this.pdf(events);

    var mailOptions = {
        from: '"Plinth Payment" <payment@plinth.in>',
        to: '' + events.email,
        subject: 'Payment Confirmation for ' + events.event.eventName,
        bcc: 'payment@plinth.in',
        html: '<div style="width:649px;margin:0 auto;border:#ececec solid 1px"> <div style="padding:22px 34px 15px 34px"> <div> <div style="text-align:center;"> <img title="Paytm Logo" src="cid:unique@kreata.ee" height=\'50\' style="margin-right:8px;" alt="Paytm" class="CToWUd"> </div><br> <div style="text-align:center;vertical-align:middle;font:bold 32px Arial;line-height: 50px;"> <div>plinth 2019 </div> </div> </div> <div style=" color:#333333;font:normal 14px Arial,Helvetica,sans-serif;"> <div style="font:bold 21px Arial,Helvetica,sans-serif;margin-top:10px;text-align:center"> <u>Transaction Receipt</u> </div> <br> <div><b>Order No:</b> ' + events.orderId + ' <br><b>Date:</b> ' + (events.date.paidAt).substring(0, 25) + ' </div> <div style="padding-top:10px"> <a href="mailto:' + events.team[0].email + '" target="_blank">' + events.team[0].email + '</a> </div> </div> <div style="clear:both"></div> </div> <div style="width:584px;background-color:#ffffff;border:#e8e7e7 solid 1px;padding:27px 0;margin:0 auto"> <div style="border-bottom:#717171 dotted 1px;font:normal 14px Arial,Helvetica,sans-serif;color:#666666;padding:0px 33px 10px"> <br> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">' + events.event.eventName + '</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style="border-bottom:#717171 dotted 1px;font:normal 14px Arial,Helvetica,sans-serif;color:#666666;padding:10px 33px 10px"> <br> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">Total</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style="border-bottom:#717171 dotted 1px;font:600 14px Arial,Helvetica,sans-serif;color:#333333;padding:17px 33px 17px"> <table style="width:100%" border="0" cellspacing="0" cellpadding="2"> <tbody> <tr> <td width="450px">Amount paid</td> <td>Rs.' + events.amount + '</td> </tr> </tbody> </table> </div> <div style=" color:#333333;font:normal 14px Arial,Helvetica,sans-serif; padding:16px;"> Dear ' + events.team[0].name + ', <br> <br> You have successfully registered for the event <b>' + events.event.eventName + '</b> in Plinth. The invoice for this transaction is attached in this mail and can also be downloaded from the Profile section on the Plinth Website. <br> <br> If you notice any error with this transaction, please contact us at payment@plinth.in <br> <br> <br> <div>Cheers! <br> Team Plinth </div> </div></div><br>  </div>',
        attachments: [{
            filename: 'plinth-logo.png',
            path: './public/media/plinth-logo.png',
            cid: 'unique@kreata.ee' //same cid value as in the html img src
        }, {
            filename: 'Payment Receipt.pdf',
            path: add,
        }],
    };


    transporter.sendMail(mailOptions, function (error, info) {

        if (error) {
            return console.log(error);
        } else {

            setTimeout(function () {
                fs.unlink(add, function (err) {
                    if (err) return console.log(err);
                    console.log('file deleted successfully');
                });
            }, 5000);
        }
        console.log('Message sent: ' + info.response);


    });
};




exports.saveSheet = function (result) {

    sheetAuth.authenticate().then((auth) => {


        var sheetID;
        var ra;
        var value;

        switch (result.event.payName) {

            case 'MUN':
                sheetID = process.env.SHEET_MUN;
                ra = 'MUN';
                value =
                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].city,
                        result.team[0].committee,
                        result.team[0].portfolio,
                        result.accomodation,
                    ];
                break;

            case 'SIF':
                sheetID = process.env.SHEET_SIF;
                ra = result.team[0].type === 'Startup' ? 'Startup' : 'Student';
                value = result.team[0].type === 'Startup' ?

                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].startupName,
                        result.team[0].website,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].technical,
                        result.team[0].management,
                        result.team[0].marketing,
                        result.team[0].writing,
                        result.team[0].design,
                        result.team[0].other
                    ]

                    :

                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].city,
                        result.team[0].year,
                        result.team[0].resume,
                        result.team[0].linkedin,
                    ];
                break;


            case 'IUPC':
                
            case 'ENCS':
                

            case 'RST':

            case 'INT':
            case 'AH':
            case 'AQ':
            case 'BW':
            case 'TQ':
            case 'RW':
            case 'RS':
            case 'DO':
            case 'LWF':
            case 'MS':
            case 'RR':
            case 'RCP':
            case 'PRA':
            case 'TP':
            case 'IC':
            case 'CD':
            case 'WR':
            case 'COM':

                sheetID = process.env['SHEET_' + ('' + result.event.clubName).toUpperCase()];
                ra = result.event.payName;
                value = [
                    result.date.createdAt,
                    result.date.paidAt,
                    result.orderId,
                    result.status,
                    result.amount,
                    result.teamName,
                    result.teamSize,
                    result.accomodation,
                ];
                for (var i = 0; i < result.teamSize; i++) {
                    value.push(result.team[i].name);
                    value.push(result.team[i].email);
                    value.push(result.team[i].phoneNumber);
                    value.push(result.team[i].college);
                }

                break;
            case 'AIML':
                sheetID = process.env.SHEET_WORKSHOPS;
                ra = result.event.payName;
                value =
                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].collegeId,
                        result.accomodation,
                    ];
                break;
            default:
                sheetID = process.env.SHEET_TEST;
                ra = 'SUO';
                value = ["HEY"];
                break;
        }
        console.log(sheetID, ra, value);
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
                console.log("Appended", response.updates.updatedRange);
                Payment.findOneAndUpdate({ 'orderId': result.orderId }, { $set: { 'sheet': response.updates.updatedRange, } }, { 'new': true }, function (err1, res) {
                    if (err1) {
                        console.log(err1)
                        return;
                    }
                });

            }
        });

    });
};


exports.updateSheet = function (result) {

    sheetAuth.authenticate().then((auth) => {


        var sheetID;
        var ra;
        var value;

        switch (result.event.payName) {

            case 'MUN':
                sheetID = process.env.SHEET_MUN;
                ra = result.sheet;
                value =
                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].city,
                        result.team[0].committee,
                        result.team[0].portfolio,
                        result.accomodation,
                    ];
                break;

            case 'SIF':
                sheetID = process.env.SHEET_SIF;
                ra = result.sheet;
                value = result.team[0].type === 'Startup' ?

                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].startupName,
                        result.team[0].website,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].technical,
                        result.team[0].management,
                        result.team[0].marketing,
                        result.team[0].writing,
                        result.team[0].design,
                        result.team[0].other
                    ]

                    :

                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].city,
                        result.team[0].year,
                        result.team[0].resume,
                        result.team[0].linkedin,
                    ];
                break;


            case 'IUPC':
                
            case 'ENCS':
                

            case 'RST':
            case 'INT':
            case 'AH':
            case 'AQ':
            case 'BW':
            case 'TQ':
            case 'RW':
            case 'RS':
            case 'DO':
            case 'LWF':
            case 'MS':
            case 'RR':
            case 'RCP':
            case 'PRA':
            case 'TP':
            case 'IC':
            case 'CD':
            case 'WR':
            case 'COM':

                sheetID = process.env['SHEET_' + ('' + result.event.clubName).toUpperCase()];
                ra = result.sheet;
                value = [
                    result.date.createdAt,
                    result.date.paidAt,
                    result.orderId,
                    result.status,
                    result.amount,
                    result.teamName,
                    result.teamSize,
                    result.accomodation,
                ];
                for (var i = 0; i < result.teamSize; i++) {
                    value.push(result.team[i].name);
                    value.push(result.team[i].email);
                    value.push(result.team[i].phoneNumber);
                    value.push(result.team[i].college);
                }

                break;
            case 'AIML':
                sheetID = process.env.SHEET_WORKSHOPS;
                ra = result.sheet;
                value =
                    [
                        result.date.createdAt,
                        result.date.paidAt,
                        result.orderId,
                        result.status,
                        result.amount,
                        result.team[0].name,
                        result.team[0].email,
                        result.team[0].phoneNumber,
                        result.team[0].college,
                        result.team[0].collegeId,
                        result.accomodation,
                    ];
                break;
            default:
                sheetID = process.env.SHEET_TEST;
                ra = 'SUO';
                value = ["HEY"];
                break;
        }
        console.log(ra);
        var sheets = google.sheets('v4');
        sheets.spreadsheets.values.update({
            auth: auth,
            spreadsheetId: sheetID,
            range: ra,
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

exports.capSheet = function (result) {

    sheetAuth.authenticate().then((auth) => {


        var sheetID;
        var ra;
        var value;
 
                sheetID = process.env.SHEET_CAMPUS;
                ra = 'REF';
                value =
                    [
                        result.date,
                        result.name,
                        result.orderId,
                        result.status,
                    ];
                
        console.log(ra);
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

exports.accSheet = function (result) {

    sheetAuth.authenticate().then((auth) => {


        var sheetID;
        var ra;
        var value;
 
                sheetID = process.env.SHEET_ACCOMODATION;
                ra = 'ACC';
                value =
                    [
                        result.date,
                        result.email,
                        result.orderId,
                        result.status,
                        result.team,
                        result.teamsize,
                    ];
                
        console.log(ra);
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