'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model("Product");


 exports.get = async()=>{
  const res = await Product.find({active: true}, 'title price slug'); // pega so os ativos e retorna o que pedi title price e slug
  return res;
 }

 exports.getBySlug = async(slug)=>{
    const res = await Product.findOne({
        slug: slug,
        active: true
      }, 'title description price slug tags')  // pega so os ativos e retorna o que pedi title price e slug
      return res ;
 }

 exports.getBySlug = async(id)=>{
    const res =await  Product.findById(id)  // pega so os ativos e retorna o que pedi title price e slug
    return res ;
 }
  exports.getByTag = async (tag)=>{
    const res =   Product.find({tags:tag ,active: true}, 'title price slug')  // pega so os ativos e retorna o que pedi title price e slug
    return res;
 }

 exports.create = async(data)=>{
    var product = new Product (data);
   await product.save()
 }

 exports.update = async(id,data)=>{
  await  Product.findByIdAndUpdate(id,{
        $set:{
          title: data.title,
          description: data.description,
          price: data.price,
          slug: data.slug
        }
      })
 }

 exports.delete = async(id)=>{
    await  Product.findByIdAndRemove(id );
 }