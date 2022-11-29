const express = require('express');
const router = express.Router();
const agencyCtrl = require('../app/controllers/agencyCtrl');

router.post('/updateAmount', agencyCtrl.updateAmount);
router.get('/:id', agencyCtrl.getAgencyById);
router.get('/', agencyCtrl.getAllAgencies);


module.exports = router;