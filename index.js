const express=require('express')
const app=express()
const bodyParser = require('body-parser')
const morgan=require('morgan')
const mongoose = require('mongoose')

const productsRoute=require('./api/routes/products.route')
const ordersRoute=require('./api/routes/orders.route')
const userRoute=require('./api/routes/user.router')

// set up database
mongoose.connect(process.env.URL_DATABASE, 

{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('-----> connect succeed database')
});

// set up body

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


//set morgan

app.use(morgan('dev'))
//set up routes

app.use('/products',productsRoute)

app.use('/orders',ordersRoute)

app.use('/users',userRoute)

// set for not found route
app.use((req,res,next)=>{
    const error=new Error('Not found')
    error.status=404
    next(error);
})
app.use((err,req,res,next)=>{
    res.status(err.status||5000)
    res.json({
        message: err.message
    })
})

//   

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is runing at  ${port}`)
})