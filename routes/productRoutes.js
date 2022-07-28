"use strict";
const express = require("express");
const products = require("../controllers/productController");
const router = express.Router();

router.get(`/api/products`, products.index);
router.post(`/products`, products.store);
router.get(`/products/:id`, products.show);
router.put(`/products/:id`, products.update);
router.delete(`/products/:id`, products.destroy);

module.exports = router;
