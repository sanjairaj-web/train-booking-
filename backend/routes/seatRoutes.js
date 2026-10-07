const express = require("express");
const router = express.Router();

const seatController =
    require("../controllers/seatController");

router.get(
    "/bus/:busId",
    seatController.getSeats
);

router.post(
    "/select",
    seatController.selectSeat
);

module.exports = router;