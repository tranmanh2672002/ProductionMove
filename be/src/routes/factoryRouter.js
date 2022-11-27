const express = require('express');
const router = express.Router();
const factoryCtrl = require('../app/controllers/factoryCtrl');

router.get('/:id', factoryCtrl.getFactoryById);
router.get('/', factoryCtrl.getAllFactories);


module.exports = router;