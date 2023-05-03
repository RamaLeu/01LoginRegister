const RegModel = require("./../models/registrationModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) =>{
    console.log(req.body);
    console.log('API OK')
    const userExists = await RegModel.exists({ name: req.body.username });
    if(userExists){
        res.status(401).json({
            status: "fail",
            message: "User already exists!"
        });
    }else{
        const {email, username, password} = req.body;
        if(!email || !username || !password){
            res.status(500).json({
                status: "fail",
                message: "Incorrect request"
            });
        }else{
            const salt = bcrypt.genSaltSync(10);
            const passHash = bcrypt.hashSync(req.body.password, salt);
            const newUser = await RegModel.create({
                email: req.body.email,
                name: req.body.username,
                password: passHash
            });

            const savedUser = await newUser.save();


            const token = jwt.sign({
                user: savedUser._id
            }, process.env.JWT_SECRET)

            res.cookie("token", token,{
                httpOnly: true,
            }).send();
        }
    }
}

exports.loginUser = async(req, res) =>{
    const {username, password} = req.body;
    const userExists = await RegModel.exists({name: username});
    if(userExists){
        const user = await RegModel.findOne({name: username});
        if(bcrypt.compareSync(password, user.password)){


            const token = jwt.sign({
                user: user._id
            }, process.env.JWT_SECRET)

            res.cookie("token", token,{
                httpOnly: true,
            }).send();



            // res.status(200).json({
            //     status: "success",
            //     data: {
            //         "username": user.name,
            //         "email": user.email,
            //     }
            // })
        }else{
            res.status(401).json({
                status: "fail",
                message: "Login data incorrect!"
            });
        }
    }else{
        res.status(401).json({
            status: "fail",
            message: "Login data incorrect!"
        });
    }
}



exports.logOut = async(req, res)=>{
    res.cookie("token", "",{
        httpOnly: true,
        expires: new Date(0)
    }).send();
}