'use strict'

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/project-controler');
const authService= require('../services/auth-service')

router.delete('/:titleProj',authService.authorize,controller.delete);
router.get('/:titleProj',authService.authorize,controller.getByTitle);
router.get('/',authService.authorize,controller.get);
router.post('/',authService.authorize,controller.create);
router.put('/:id',authService.authorize,controller.put);


module.exports = router;