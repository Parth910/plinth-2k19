var mongoose = require('mongoose');


var paymentSchema = mongoose.Schema({
        orderId        : String,
        tranId         : String,
        status         : String,
        amount         : Number,
        email          : String,
        event          : {
                eventName : String,
                clubName  : String,
                payName   : String,
        },
        date      : {
                createdAt: String,
                paidAt: String,
        },
        teamSize        : Number,
        team : [],
        accomodation : String,
        teamName : String,
        referrer : String,
        sheet: String,
});

// create the model for payments and expose it to our app
module.exports = mongoose.model('Payment', paymentSchema);
