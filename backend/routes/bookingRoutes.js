const express = require("express");

const router =
    express.Router();


const bookingController =
    require("../controllers/bookingController");


// ==========================================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================================

router.post(
    "/",
    bookingController.createBooking
);


// ==========================================================
// GET ALL BOOKINGS
// GET /api/bookings
// ==========================================================

router.get(
    "/",
    bookingController.getAllBookings
);


// ==========================================================
// GET BOOKING BY PNR
// GET /api/bookings/pnr/:pnr
// ==========================================================

router.get(
    "/pnr/:pnr",
    bookingController.getBookingByPNR
);


// ==========================================================
// GET BOOKINGS BY USER
// GET /api/bookings/user/:userId
// ==========================================================

router.get(
    "/user/:userId",
    bookingController.getBookingsByUser
);


// ==========================================================
// EXPORT
// ==========================================================

module.exports = router;