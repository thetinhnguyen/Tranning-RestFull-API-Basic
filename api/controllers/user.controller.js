const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");


module.exports.signup_user=(req,res,next)=>{
    User.find().then(result=>{
        
    })
    User.find({email: req.body.email}).then(user=>{
        if(user.length>0){
           
            return res.status(409).json({
                mesage: 'Email exists'
            })
        }
        else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if(err){
                   return  res.status(500).json({
                        err
                    })
                }
                else{
                    const user=new User({
                        _id: mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password: hash
                    })
                    user.save().then(doc=>{
                     return    res.status(201).json({
                            mesage:'creating user succeed',
                            user: doc
                        })
                    }).catch(err=>{
                       return  res.status(500).json({
                            mesage: "Don't create user",
                            err
                        })
                    })
                }
            })

        }
    }).catch(err=>res.status(500).json({err}))
 
}


module.exports.login_user=(req,res)=>{
    User.findOne({email: req.body.email}).then(doc=>{
        if(!doc || doc===null){
            return res.status(401).json({
                message: 'Auth false'
            })
        }
        else{
            bcrypt.compare(req.body.password,doc.password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message: 'Auth false'
                    })
                }
                if(result){
                    const token=jwt.sign({
                        userId: doc._id,
                        email: doc.email
                    },process.env.JWT_KEY,{
                        expiresIn: "7d"
                    })
                    return res.status(200).json({
                        message: 'Auth successfull',
                        token
                    })
                }
                return res.status(401).json({
                    message: 'Auth false'
                })
            })

        }
    }).catch(err=>{
        res.status(500).json({
            message: 'Auth false'
        })
    })
}