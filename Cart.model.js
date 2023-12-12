var mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/nem")
 
var cartSchema = mongoose.Schema({
    title:String,
    image:String,
    price:Number,
    count: Number
})

var Cart = mongoose.model('cart',cartSchema)

module.exports = Cart