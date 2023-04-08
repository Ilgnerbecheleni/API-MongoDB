'use strict'
const mongoose = require('mongoose');
const Customer = mongoose.model("Customer");


 exports.get = async()=>{
  const res = await Customer.find({},'name'); // pega so os ativos e retorna o que pedi title price e slug
  return res;
 }

 exports.create = async(data)=>{


    var customer = new Customer (data);
   await customer.save()
 }

 exports.authenticate = async(data)=>{
  const res = await Customer.findOne({
    email:data.email ,
    password:data.password
  }); // pega so os ativos e retorna o que pedi title price e slug
  return res;
 }

