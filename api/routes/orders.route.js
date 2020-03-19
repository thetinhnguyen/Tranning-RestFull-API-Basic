let express=require('express')
let route=express.Router()


const validation=require('../validations/order.validation')
const auth_check=require('../midlewares/auth-user.midleware')

const orderController=require('../controllers/order.controller')

route.get('/',orderController.get_all_order)
route.get('/:orderId',orderController.get_one_order)



route.post('/',auth_check,validation.checkProduct,orderController.create_order)

route.delete('/:orderId',auth_check,orderController.remove_order)
module.exports=route