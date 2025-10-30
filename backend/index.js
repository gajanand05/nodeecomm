const express = require('express')
require('./db/config')
const User = require('./db/Users')
const cors = require('cors')
const Product = require('./db/Product')
app = express();
app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000"
// }));


app.use(cors()); // define only cors error remove
app.get('/',async(req,resp)=>{
     console.warn('Node testing')
    resp.send('Node is runing')

})


app.post('/register',async(req,resp)=>{
    const user = new User(req.body)
    result  = await user.save()
    resp.send(result)

})


app.post('/login',async(req,resp) => {
    if(req.body.email && req.body.password){
    let userlogin  = await User.findOne(req.body).select('-password')
    
    if(userlogin){
        resp.send(userlogin)
    }else{
       resp.send('No User Founds')   
    }
    
    }else{
       resp.send('No User Found') 
    }
})

// add Products
app.post('/add-product',async(req,resp)=>{ 
    let product = new Product(req.body)
    console.log(req.body);
     product  = await product.save()
     resp.send(product)
}) 

// Product lists
app.get('/products',async(req,resp)=>{
    let productList = await Product.find();
    if(productList.length > 0){
       resp.send(productList)
    }else{
        resp.send('No products are avaliable.')
    }

})
app.delete('/products/delete/:id', async (req, resp) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return resp.status(404).send({ message: "Product not found" });
    }
    resp.send({ message: "Product deleted successfully" });
  } catch (error) {
    resp.status(500).send({ message: "Error deleting product", error });
  }
});

// get product by id for Update
app.get('/products/:id', async (req, resp) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    if (product) {
      resp.send(product);
    } else {
      resp.status(404).send({ message: 'No product found' });
    }
  } catch (error) {
    resp.status(500).send({ message: 'Error fetching product', error });
  }
});

// Update product by ID
app.put('/products/:id', async (req, resp) => {
  try {
    let result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return resp.status(404).send({ message: 'Product not found' });
    }

    resp.send({ message: 'Product updated successfully', result });
  } catch (error) {
    resp.status(500).send({ message: 'Error updating product', error });
  }
});
// product search api

app.get('/products/search/:key',  async(req, resp) => {
  //console.log(req.params) 
  //resp.send(req.params);
  try {
    
    let result = await Product.find({
      $or: [
        { name: { $regex: req.params.key } },      // search by name
        { category: { $regex: req.params.key } }   // search by category
      ]
    });

    if (result.length > 0) {
      resp.send(result);
    } else {
      resp.status(404).send({ message: 'No matching products found' });
    }
  } catch (error) {
    resp.status(500).send({ message: 'Error searching products', error });
  }
});

app.listen(8500);       