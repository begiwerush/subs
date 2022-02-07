const mongoose = require("mongoose");


const {Schema, model} = mongoose;


const EmailListingSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    emailProvider : {
        type: String,
        required: true
    },

}, {timestamps: true})

EmailListingSchema.index({email: 'text', emailProvider: "text"});





const emailListingModel = model("Subscribtions", EmailListingSchema);

module.exports = emailListingModel;
