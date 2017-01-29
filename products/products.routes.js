const express=require('express');
const router =express.Router();
const myProducts = require('./product.model.js');

const findTargetProduct=function(id){
  for(var i=0;i<myProducts.length;i++){
    if(myProducts[i].id===id){
      return myProducts[i];
    }
  }
}

  router.get('/',(req,res,next)=>{
    res.render('products',{products: myProducts});
  })

  router.get('/:id/edit',(req,res,next)=>{
    const id = req.params.id*1;
    var pro=findTargetProduct(id);
    res.render('edit',{pro})
  })

  router.post('/:id/edit',(req,res,next)=>{
    const newvalue = req.body.newName;
    const id = req.params.id*1;

    const pro=findTargetProduct(id);
    pro.name=newvalue;
    res.redirect('/products')

  })

module.exports = router;
