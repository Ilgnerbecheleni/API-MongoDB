' use strict'

const express = require('express')
const router = express.Router()
const controller = require('../src/Controllers/Customer-controller')

router.get('/', controller.get)
router.post('/', controller.post)
router.post('/authenticate', controller.authenticate)

module.exports = router
