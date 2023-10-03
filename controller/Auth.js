const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.signup = async(req, res) => {
    try{
        // get data
        const {name, email, password, role} = req.body;

        // check if user is already existed
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already existed"
            });
        }
        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(400).json({
                success:false,
                message:'Error in hashing',
            })
        }
        // Creating entry
        const user = await User.create({
            name, email, password:hashedPassword, role
        })
        return res.status(200).json({
            success:true,
            message:'Entry created Successfully'
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'User cannot be registered please try again later'
        })
    }
}

exports.login = async(req, res) => {
    try{
        // data fetch
        const {email, password} = req.body;

        // To check if user has entered email or password
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the details",
            });
        }
        
        // To check whether he is registered user
        let user = await User.findOne({email});
        // if not registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            });
        }

        const payload = {
            email:user.email,
            id:user._id,
            role:user.role
        }
        // Verifying password and creating a jwt
        if(await bcrypt.compare(password, user.password)){
            // If Password matches
            // creating a jwt
            const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn:"2h"} )
            // creating a field token in user object and sending this jwt token there
            user = user.toObject();
            user.token = token;
            // removing the password from user object as if we'll send user as a response and it will containg password it will be risky as hacker will ahve emaila nd password both
            user.password = undefined;

            // sending token as a cookie
            const options = {
                expires: new Date( Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"User logged in successfully",
            })
        }
        else{
            // password does not match
            return res.status(402).json({
                success:false,
                message:"Password does not match"
            })
        }

    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Login Failed",
        })
    }
}