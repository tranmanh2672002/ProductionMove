const express = require('express');
const router = express.Router();
const guaranteeCtrl = require('../app/controllers/guaranteeCtrl');


router.get('/', guaranteeCtrl.getAllGuarantees);
router.get('/:id', guaranteeCtrl.getGuaranteeById);


module.exports = router;