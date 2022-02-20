const express = require('express')
const Razorpay = require('razorpay')
require('dotenv').config()

const app = express()

const port = process.env.PORT || 3000
app.set('view engine', 'ejs')
app.use(express.static('public'))

// const instance = new Razorpay({
//     key_id: process.env.KEY_ID,
//     key_secret: process.env.KEY_SECRET
// })

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(port, () => console.log('Server is up on port', port))