const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number.']
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pincode: {
        type:Number,
        required: true
    },
    image:{
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
})

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;