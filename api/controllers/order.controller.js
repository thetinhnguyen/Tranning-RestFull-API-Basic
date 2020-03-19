const mongoose=require('mongoose')

const Order=require('../models/order.model')

module.exports.get_all_order=(req,res)=>{


    Order.find().populate('product','name').then(docs=>{
        res.status(200).json(docs)
    }).catch(err=>{
        res.status(500).json({
            message: "Not found",
            err
        })
    })
}
module.exports.get_one_order=(req,res)=>{
    Order.findById(req.params.orderId).then(doc=>{
        if(doc){
            res.status(200).json(doc)
        }
        else{
            res.status(404).json({
                message: 'Not found orderId'
            })
        }
    }).catch(err=>{
        res.status(500).json({
            message: 'OrderId is incorrect',
            err
        })
    })
   
}
module.exports.create_order=(req,res)=>{
    const order=new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    })
    order.save().
    then(
        result=>{
            res.status(201).json(result)
        }
    ).
    catch(err=>{
        res.status(500).json(err)
    })
 
}
module.exports.remove_order=(req,res)=>{


    Order.remove({_id:req.params.orderId}).then(result=>{
        res.status(200).json({
            message: 'Remove succeed'
        })
    }).catch(err=>{
        json.status(500).json({
            message: "Don't remove order",
            err
        })
    })
}