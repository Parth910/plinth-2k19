var mongoose = require('mongoose');

var caSchema = mongoose.Schema({
        googletoken    : String,
        googleid       : String,
        facebooktoken  : String,
        facebookid     : String,
        email          : String,
        name           : String,
        phoneNumber    : Number,
        college        : String,
        year           : String,
        city           : String,
        valid          : Boolean,
        gender         : String,
        registrations  : Number,
        referral       : String
});

module.exports = mongoose.model('ca', caSchema);
