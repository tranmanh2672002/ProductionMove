const express = require('express');
const router = express.Router();
const deliveryCtrl = require('../app/controllers/deliveryCtrl');

router.get('/from/:id', deliveryCtrl.getDeliveriesFromId);
router.get('/to/:id', deliveryCtrl.getDeliveriesToId);
router.post('/createDelivery', deliveryCtrl.createDelivery);
router.post('/updateStatus/:id', deliveryCtrl.updateStatus);

module.exports = router;