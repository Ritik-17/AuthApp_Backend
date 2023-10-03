const user = require('../models/user');
const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.signup = async(req, res) => {
    try{
        // get data
        const {name, email, password, role} = req.body;

        // check if user is already existed
        const existingUser = await user.findOne({email})
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
        const User = await user.create({
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
        const user = await user.findOne({email});
        // if not registered user
        if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered"
            });
        }

    }
    catch(err){

    }
}