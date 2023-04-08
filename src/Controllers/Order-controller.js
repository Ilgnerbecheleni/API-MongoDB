'use strict'
const repository = require('../Repositories/orderRepositorie');
const guid = require('guid');
const auth = require('../Services/auth-jwt')
exports.get = async(req, res, next) =>{
try {
  var data  = await repository.get();
res.status(200).send(data);

}
catch (error) {
  res.status(500).send({message:"falha ao processar requisicao"});
}

}

exports.post = async(req, res, next) => {

  try {

    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    await console.log("token:"+token);
    const data = await auth.decodeToken(token);

    await repository.create({
      customer:data.id,
      number:guid.raw().substring(0,6),
      items: req.body.items
    });
    res.status(201).send( {message:"Order cadastrada com sucesso"})
  } catch (error) {
    res.status(400).send( {message:"Falha ao Cadastrar" , erro:error.message})
  }

}
