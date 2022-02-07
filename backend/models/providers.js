const mongoose = require("mongoose");


const {Schema, model} = mongoose;


const ProviderSchema = new Schema({
    emailProvider : {
        type: [String],
        required: true,
        default: []
    },

}, {timestamps: true})





const providerModel = model("provider", ProviderSchema);

module.exports = providerModel;
