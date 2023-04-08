'use strict'
const mongoose = require('mongoose');
const Order = mongoose.model("Order");


 exports.get = async()=>{
  const res = await Order.find({},'number status ').
  populate('customer','name').
  populate('items.product','title'); // pega so os ativos e retorna o que pedi title price e slug
  return res;
 }

 exports.create = async(data)=>{
    var customer = new Order(data);
   await customer.save()
 }
