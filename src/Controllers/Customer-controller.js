'use strict'
const repository = require('../Repositories/customerRepositorie')
const md5 = require('md5')
const authservice = require('../Services/auth-jwt')
exports.get = async (req, res, next) => {
  try {
    var data = await repository.get()
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({ message: 'falha ao processar requisicao' })
  }
}

exports.post = async (req, res, next) => {
  try {
    await repository.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })
    res.status(201).send({ message: 'user cadastrado com sucesso' })
  } catch (error) {
    res.status(400).send({ message: 'Falha ao Cadastrar', erro: error.message })
  }
}

exports.authenticate = async (req, res, next) => {
  try {
    const customer = await repository.authenticate({
      email: req.body.email,
      password: md5(req.body.password + global.SALT_KEY)
    })

    if (!customer) {
      res.status(404).send({ message: 'Usuario ou senha invalidos' })
    }
    const token = await authservice.generateToken({
      id: customer._id,
      email: customer.email,
      name: customer.name
    })

    res.status(201).send({
      token: token,
      data: {
        email: customer.email,
        name: customer.name
      }
    })
  } catch (error) {
    res.status(400).send({ message: 'Falha ao Cadastrar', erro: error.message })
  }
}
