const express = require('express');
const router = express.Router();
const controller = require('../controllers/task-controller');

router.get('/',controller.get);
router.get('/id/:id',controller.getById);
router.delete('/:id',controller.delete);
router.post('/',controller.create);
router.put('/:id',controller.put);

module.exports = router;