const express = require('express');
const router = express.Router();
const productCtrl = require('../app/controllers/productCtrl');

router.get('/allProducts', productCtrl.getAllProducts);
router.get('/allProductsFactory/:id', productCtrl.getAllProductsFactory);
router.post('/create', productCtrl.create);
router.post('/update', productCtrl.update);
router.post('/delete', productCtrl.delete);




module.exports = router;