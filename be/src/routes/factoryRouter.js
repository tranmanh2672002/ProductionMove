const express = require('express');
const router = express.Router();
const factoryCtrl = require('../app/controllers/factoryCtrl');

router.get('/:id', factoryCtrl.getFactoryById);
router.post('/updateAmount', factoryCtrl.updateAmount);
router.get('/', factoryCtrl.getAllFactories);



module.exports = router;