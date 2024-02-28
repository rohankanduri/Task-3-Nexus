const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    category: {
        type: String,
        lowercase: true,
        enum: ['myself', 'others']
    },
    fname:{
        type:String,
        required: true
    },
    lname:{
        type:String,
        required: true
    },
    gender: {
        type: String,
        lowercase: true,
        enum: ['male', 'female','other']
    },
    dob: {
        type: Date,
        required: true
    },
    age:{
        type:Number,
        required:true
    },
    email:{
        type: String,
        required: true,
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
        unique: false, 
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type:Number,
        required: true
    },
    phone:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
 
})

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;