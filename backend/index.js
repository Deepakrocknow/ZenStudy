const express = require('express');
const app = express();
const cors = require('cors');

require('./db/config');
const user = require('./db/user');
const product = require('./db/product');

app.use(express.json());
app.use(cors());




app.post('/register',async(req,resp)=>{
    let ans = await new user(req.body);
    let res = await ans.save()
    res = res.toObject();
    delete res.pass  ;
    console.log(res);
    resp.send({res});
})

app.post('/login',async(req,resp)=>{
      console.log(req.body);
      if(req.body.pass && req.body.email){
        let ans = await user.findOne(req.body);
        //console.log(ans);
        if(ans){
            resp.send({ans});
        }
        else{
          resp.send({result:"no user found"});
        }
      }
      else{
        resp.send({result:"no user found"});
      }
})

app.post('/addpro',async(req,resp)=>{
  let ans = await new product(req.body);
  let res = await ans.save();
  console.log(res);
  resp.send(res);
})
  

app.get('/products', async(req,resp)=>{
       let ans  = await product.find();
       if(ans.length){
         resp.send(ans);
       }
       else{
          resp.send({result:"No products found"})
       }
})

// Endpoint to update user profile
app.put('/updateProfile/:id', async (req, resp) => {
  const { name, email, password } = req.body;
  const updatedUser = await user.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });

  if (updatedUser) {
      updatedUser.password = undefined;  // To ensure we don't send the password in response
      resp.send({ updatedUser });
  } else {
      resp.send({ result: 'User not found' });
  }
});


app.delete('/prod/:id',async(req,resp)=>{
      const ans = await product.deleteOne({_id:req.params.id})
      resp.send(ans);
})

app.get('/prod/:id',async(req,resp)=>{
      const ans = await product.findOne({_id:req.params.id});
      if(ans){
        resp.send(ans);                        
      }
})

app.put('/prod/:id', async(req,resp)=>{
     const ans = await product.updateOne({_id:req.params.id},{$set:req.body})
     resp.send(ans);
})

app.get('/search/:key',async(req,resp)=>{
     let res = await product.find({
        "$or":[
          {name:{$regex:req.params.key}},
          {price:{$regex:req.params.key}},
          {company:{$regex:req.params.key}},
          {category:{$regex:req.params.key}},
        ]
     })
     resp.send(res)
})


app.listen(4500);


