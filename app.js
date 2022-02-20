const express = require('express')
const Razorpay = require('razorpay')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000
app.set('view engine', 'ejs')

const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
})

// instance.orders.create({
//     amount: 100,
//     currency: "EGP",
//     receipt: "receipt#1",
//     notes: {
//         key1: "value3",
//         key2: "value2"
//     }
// })

app.get('/', (req, res) => {
    res.render('index', {
        key_id: process.env.KEY_ID,
        order_id: 'order_Ixx9ajlXrR8n5Z'
    })
})

app.post('/', (req, res) => {
    var options = {
        amount: req.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    }
    instance.orders.create(options, function(err, order) {
      console.log(order)
      res.send({orderId: order.id})
    })
})

app.post("/api/payment/verify",(req,res)=>{
    let body=req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'Wok5mJv2F0pa5HKLeXZfUr9r')
                                    .update(body.toString())// replace api key secret here
                                    .digest('hex');
                                    console.log("sig received " ,req.body.response.razorpay_signature);
                                    console.log("sig generated " ,expectedSignature);
    var response = {"signatureIsValid":"false"}
    if(expectedSignature === req.body.response.razorpay_signature)
    response={"signatureIsValid":"true"}
        res.send(response);
});



app.listen(port, () => console.log('Server is up on port', port))