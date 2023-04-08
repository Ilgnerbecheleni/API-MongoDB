' use strict';

const express = require('express');
const router = express.Router()
const controller = require('../src/Controllers/Product-controller');
const authservice = require('../src/Services/auth-jwt');

router.get ('/',controller.get);
router.get ('/:slug',controller.getBySlug);
router.get ('/admin/:id',controller.getById);
router.get ('/tags/:tag',controller.getByTag);
router.post('/',authservice.authorize, controller.post);
router.put('/:id',controller.put );
router.delete('/',controller.delete);


  module.exports = router ;