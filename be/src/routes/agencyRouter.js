const express = require('express');
const router = express.Router();
const agencyCtrl = require('../app/controllers/agencyCtrl');
const orderCtrl = require('../app/controllers/orderCtrl');
const guaranteeOrderCtrl = require('../app/controllers/guaranteeOrderCtrl');


router.post('/updateAmount', agencyCtrl.updateAmount);
router.get('/order/:id', orderCtrl.getOderFromIdAgency);
router.post('/createOder/', orderCtrl.createOder);
router.post('/createGuaranteeOrder/', guaranteeOrderCtrl.createGuaranteeOrder);
router.put('/updateNotGuaranteeOrder/:id', guaranteeOrderCtrl.updateNotGuaranteeOrder);
router.get('/guaranteeOrder/:id', guaranteeOrderCtrl.getGuaranteeOrderById);
router.get('/', agencyCtrl.getAllAgencies);
router.get('/:id', agencyCtrl.getAgencyById);


module.exports = router;