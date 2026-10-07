const express = require("express");
const router = express.Router();

const paymentController =
    require("../controllers/paymentController");


router.post(
    "/",
    paymentController.makePayment
);


router.get(
    "/:id",
    paymentController.getPayment
);


module.exports = router;