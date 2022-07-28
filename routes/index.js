"use strict";
const express = require("express");
const router = express();
const products = require("./productRoutes");
router.get(`/api/v1/`, (_req, res) => {
  res.json({
    message: "Welcome to restfullapi",
  });
});

router.use(products);

module.exports = router;
