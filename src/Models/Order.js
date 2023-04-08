'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//composicao da tabela produto
const schema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId, //referencia o usuario
    ref: 'Customer'
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'done'],
    default: 'created'
  },

  items: [
    {
      quantity: {
        type: Number,
        required: true,
        default: 1
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId, //referencia o produto
        ref: 'Product'
      }
    }
  ]
})

module.exports = mongoose.model('Order', schema)
