const bookingModel =
    require("../models/bookingModel");


// ==========================================================
// CREATE BOOKING
// POST /api/bookings
// ==========================================================

function createBooking(req, res) {

    try {

        const {

            userId,

            train,

            journey,

            passenger,

            seats,

            coach,

            payment

        } = req.body;


        // ==================================================
        // VALIDATION
        // ==================================================

        if (!train) {

            return res.status(400).json({

                success: false,

                message:
                    "Train details are required"

            });

        }


        if (!journey) {

            return res.status(400).json({

                success: false,

                message:
                    "Journey details are required"

            });

        }


        if (!passenger) {

            return res.status(400).json({

                success: false,

                message:
                    "Passenger details are required"

            });

        }


        if (
            !seats ||
            !Array.isArray(seats) ||
            seats.length === 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "At least one seat is required"

            });

        }


        if (!payment) {

            return res.status(400).json({

                success: false,

                message:
                    "Payment details are required"

            });

        }


        // ==================================================
        // CREATE BOOKING
        // ==================================================

        const booking =
            bookingModel.createBooking({

                userId:
                    userId || null,

                train,

                journey,

                passenger,

                seats,

                coach:
                    coach || "S1",

                payment

            });


        // ==================================================
        // RESPONSE
        // ==================================================

        return res.status(201).json({

            success: true,

            message:
                "Booking created successfully",

            booking

        });

    }

    catch (error) {

        console.error(
            "CREATE BOOKING ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to create booking"

        });

    }

}


// ==========================================================
// GET ALL BOOKINGS
// GET /api/bookings
// ==========================================================

function getAllBookings(req, res) {

    try {

        const bookings =
            bookingModel.getAllBookings();


        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings

        });

    }

    catch (error) {

        console.error(
            "GET BOOKINGS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to load bookings"

        });

    }

}


// ==========================================================
// GET BOOKING BY PNR
// GET /api/bookings/pnr/:pnr
// ==========================================================

function getBookingByPNR(req, res) {

    try {

        const {
            pnr
        } = req.params;


        const booking =
            bookingModel.getBookingByPNR(
                pnr
            );


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found"

            });

        }


        return res.status(200).json({

            success: true,

            booking

        });

    }

    catch (error) {

        console.error(
            "GET PNR ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to find booking"

        });

    }

}


// ==========================================================
// GET BOOKINGS BY USER
// GET /api/bookings/user/:userId
// ==========================================================

function getBookingsByUser(req, res) {

    try {

        const {
            userId
        } = req.params;


        const bookings =
            bookingModel.getBookingsByUser(
                userId
            );


        return res.status(200).json({

            success: true,

            count:
                bookings.length,

            bookings

        });

    }

    catch (error) {

        console.error(
            "GET USER BOOKINGS ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to load user bookings"

        });

    }

}


// ==========================================================
// EXPORT
// ==========================================================

module.exports = {

    createBooking,

    getAllBookings,

    getBookingByPNR,

    getBookingsByUser

};