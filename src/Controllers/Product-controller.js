'use strict'
const mongoose = require('mongoose');
const Product = mongoose.model("Product");
const repository = require('../Repositories/productRepositorie');
const azure = require ('azure-storage');
const guid = require('guid')
const config = require('../config');


exports.get = async(req, res, next) =>{
try {
  var data  = await repository.get();
res.status(200).send(data);

}
catch (error) {
  res.status(500).send({message:"falha ao processar requisicao"});
}



}


exports.getBySlug = async(req, res, next) =>{
  try {
    var data = await repository.getBySlug(req.params.slug) ;
    res.status(200).send( data);
  } catch (error) {
    res.status(500).send({message:"falha ao processar requisicao"});
  }

}

exports.getById = async (req, res, next) =>{
  try {
    var data = await  repository.getById(req.params.id);
    res.status(200).send( data)
  } catch (error) {
    res.status(500).send({message:"falha ao processar requisicao"});
  }


}

exports.getByTag = async(req, res, next) =>{

 try {
  var data = await repository.getByTag(req.params.tag);
  res.status(200).send( data);
 } catch (error) {
  res.status(500).send({message:"falha ao processar requisicao"});
 }
}


exports.post = async(req, res, next) => {

  const blobSvc = azure.createBlobService(config.containerConnectionString);

  let filename = guid.raw().toString() + ".jpg";
  let rawdata = req.body.image;

  let matches = rawdata.match()


  try {
    await repository.create(req.body);
    res.status(201).send( {message:"Produto cadastrado com sucesso"})
  } catch (error) {
    res.status(400).send( {message:"Falha ao Cadastrar"})
  }

}

exports.put = async(req, res, next) => {

  try {
    await repository.update(req.params.id,req.body);
    res.status(201).send( {message:"Produto alterado com sucesso"})
  } catch (error) {
    res.status(400).send( {message:"Falha ao alterar"})
  }

  }

  exports.delete =  async(req, res, next) => {

    try {
      await  repository.delete(req.body.id);
      res.status(201).send( {message:"Produto removido com sucesso"});
    } catch (error) {
      res.status(400).send( {message:"Falha ao remover"});
    }

  }