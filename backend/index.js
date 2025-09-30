const express = require('express')
require('./db/config')
const User = require('./db/Users')
const cors = require('cors')

app = express();
app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000"
// }));
app.use(cors()); // define only cors error remove


app.get('',(req,resp)=>{
    resp.send('My first program is running')
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

app.listen(8500);      