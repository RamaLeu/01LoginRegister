const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    
});

const ProductModel = new mongoose.model("products", productSchema);

module.exports = ProductModel;