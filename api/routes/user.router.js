let express = require("express");

let route = express.Router();

const userController=require('../controllers/user.controller')

route.post('/signup',userController.signup_user)
route.post('/login',userController.login_user)

module.exports = route;
