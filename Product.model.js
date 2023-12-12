var mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/nem")
 
var productSchema = mongoose.Schema({
    title:String,
    image:String,
    id:Number,
    price:Number,
    description:String,
    category: String,
    rating: Object
})

var Product = mongoose.model('product',productSchema)

module.exports = Product