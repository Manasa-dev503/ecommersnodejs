var Product = require("./Product.model")
var Cart = require("./Cart.model")
var express = require('express')
const { count } = require("console")
var app = express()
app.set("view engine", "ejs")



app.get("/", function (req, res) {
    Product.find().then(function (data) {
        Cart.find().then(function (cartitems) {
            //console.log(data.length)

            //console.log(data)
            //res.json(data)
            res.render("products", { products: data, cart: cartitems })
            
        })
    })
        .catch(function (err) {
            console.log(err)
        })
})

app.get("/addtocart/:id", function (req, res) {
    Product.find({ _id: req.params.id }).then(function (product) {
        var productCopy = JSON.parse(JSON.stringify(product[0]))
        //delete productCopy['_id'];
        //var { _id,...productCopy } = productCopy;
        //Reflect.deleteProperty(productCopy,"_id")
        //console.log(productCopy);
        var addedproduct = new Cart({
            title: productCopy.title,
            image: productCopy.image,
            price: productCopy.price,
            count: 1
        });
        //var addedproduct = new Cart(productCopy);
        //console.log(addedproduct);
        addedproduct.save();

        res.redirect("/")

    })

})

app.get("/cart", function (req, res) {
    Cart.find().then(function (cart) {
        console.log(cart)
        //console.log(cart.length)
        res.render('cart', { Cart: cart })
    })
})


app.get("/inc/:id", function (req, res) {
    Cart.find({ _id: req.params.id }).then(function (increcount) {
        var cartcopy = JSON.parse(JSON.stringify(increcount[0]));
        Cart.updateOne({ _id: req.params.id }, { $set: { count: cartcopy.count + 1 } }).then(function(res){
            console.log(res);
        })        
        res.redirect("/cart");

    })
})

app.get("/dec/:id",function(req,res){
    Cart.find({_id:req.params.id}).then(function(decrecount){
        //console.log(decrecount[0])
        var cartcopy = JSON.parse(JSON.stringify(decrecount[0]))
        Cart.updateOne({_id:req.params.id},{$set:{count:cartcopy.count-1}}).then(function(res){
            console.log(res)
        })
        res.redirect("/cart")
    })
})

app.get("/remove/:id",function(req,res){
    Cart.find({_id:req.params.id}).then(function(remove){
        Cart.deleteOne({_id:req.params.id}).then(function(res){
            console.log(res)
        })
        res.redirect("/cart")
    })
})
     

app.get("/home",function(req,res){
    res.redirect("/")
})
       













app.listen(3300, function () { console.log("server is running on 3300") })