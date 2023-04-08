' use strict'

const express = require('express')
const router = express.Router()
const controller = require('../src/Controllers/Order-controller')
const authservice = require('../src/Services/auth-jwt');
router.get('/',authservice.authorize, controller.get)
router.post('/',authservice.authorize, controller.post)


module.exports = router
