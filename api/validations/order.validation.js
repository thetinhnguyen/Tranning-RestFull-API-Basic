const mongoose=require('mongoose')
const Product=require('../models/product.model')

module.exports.checkProduct=(req,res,next)=>{
    console.log(req.body)
    Product.findById(req.body.productId).then(
        doc=>{
            if(doc && doc!==null){
                next()
            }
            else{
                res.status(404).json({
                    mesage: 'Not found ProductId'
                })
            }
        }
    ).catch(err=>{
        res.status(500).json({
            mesage: 'ProductId  is incorrect',
            err
        })
    })
}