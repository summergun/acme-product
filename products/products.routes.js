const express=require('express');
const router =express.Router();
//naming.. just call this products
const myProducts = require('./product.model.js');

//not sure you need this method
const getProducts=function(){
  return myProducts;
}

//give yourself some space around your operators
const findTargetProduct = function(id){
  for(var i=0;i<myProducts.length;i++){
    if(myProducts[i].id===id){
      return myProducts[i];
    }
  }
}

//this logic should be in the product model instead.
const addProduct=function(product){
  var max=myProducts.length;//use reduce to find the max value
  max++;
  product.id=max;
  myProducts.push(product);
}

  router.get('/',(req,res,next)=>{
    res.render('products',{products: myProducts});
  })

  router.get('/:id/edit',(req,res,next)=>{
    const id = req.params.id*1;
    var pro=findTargetProduct(id);//naming.. call it product not pro
    res.render('edit',{pro})
  })

  //if editing then use patch or put... only post for inserting
  router.post('/:id/edit',(req,res,next)=>{
    const newvalue = req.body.newName;
    const id = req.params.id*1;
    const pro=findTargetProduct(id);
    pro.name=newvalue;
    res.redirect('/products')

  });

  router.post('/',(req,res,next)=>{
    addProduct(req.body);
    //console.log(req.body);
   res.redirect('/products');
  })

  router.get('/add', function(req, res){
  res.render('add');
});


  router.delete('/:id',(req,res)=>{
    const id=req.params.id*1;
    const product = findTargetProduct(id);
    const index = myProducts.indexOf(product);
    myProducts.splice(index,1);
    res.redirect('/products')
})

module.exports = router;


