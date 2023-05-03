const ProductModel = require("./../models/productModel");
// const jwt = require('jsonwebtoken');

exports.newProduct = async (req, res) =>{
    const newProduct = await ProductModel.create({
        name: req.body.name,
    });

    const savedProduct = newProduct.save();

    res.status(200).json({
        status: "success",
        data: savedProduct.name,
    });
}