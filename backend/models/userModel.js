const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please add a name'],
    },
    email: {
        type: String,
        required: [true, 'please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'please add password'],
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },


}, {
    timestamps: true,
})
module.exports= mongoose.model('User',userSchema)