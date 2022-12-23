const express = require('express');
const router = express.Router();
const deliveryCtrl = require('../app/controllers/deliveryCtrl');

router.get('/from/:id', deliveryCtrl.getDeliveriesFromId);
router.get('/to/:id', deliveryCtrl.getDeliveriesToId);
router.post('/createDeliveryByFactory', deliveryCtrl.createDeliveryByFactory);
router.post('/createDeliveryByAgency', deliveryCtrl.createDeliveryByAgency);
router.put('/updateStatus/:id', deliveryCtrl.updateStatus);

module.exports = router;