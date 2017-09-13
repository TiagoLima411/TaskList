'use strict'

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/project-controler');
const authService= require('../services/auth-service')

router.delete('/:id',controller.delete);
router.get('/:titleProj',controller.getByTitle);
router.get('/',controller.get);
router.post('/',controller.create);
router.put('/:id',controller.put);


module.exports = router;