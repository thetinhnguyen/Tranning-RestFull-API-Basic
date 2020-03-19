let express = require("express");

let route = express.Router();


const auth_check=require('../midlewares/auth-user.midleware')
const productController=require('../controllers/product.controller')





route.get("/",productController.get_all_product);


route.post("/",auth_check,productController.create_product);

route.get("/:productId", productController.get_one_product);
route.delete("/:productId",auth_check, productController.remove_product);
route.patch("/:productId",auth_check,productController.update_product);
module.exports = route;
