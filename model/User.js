const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    address: {
        houseNo: {
            type: Number,
        },
        location: {
            type: String,
        }
    }
});

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema);

module.exports = User;
