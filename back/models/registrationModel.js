const mongoose = require("mongoose");

const regSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

    
});

const RegModel = new mongoose.model("users", regSchema);

module.exports = RegModel;