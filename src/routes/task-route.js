const express = require('express');
const router = express.Router();
const controller = require('../controllers/task-controller');

router.get('/',controller.get);
router.delete('/',controller.delete);
router.post('/',controller.create);
router.put('/:id',controller.put);

module.exports = router;