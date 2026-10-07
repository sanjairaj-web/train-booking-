// ==========================================================
// BOOKING MODEL
// ==========================================================

// Temporary in-memory booking storage

const bookings = [];


// ==========================================================
// CREATE BOOKING
// ==========================================================

function createBooking(bookingData) {

    const booking = {

        id: bookings.length + 1,

        pnr:
            generatePNR(),

        ...bookingData,

        status: "CONFIRMED",

        bookedAt:
            new Date().toISOString()

    };


    bookings.push(booking);


    return booking;

}


// ==========================================================
// GET ALL BOOKINGS
// ==========================================================

function getAllBookings() {

    return bookings;

}


// ==========================================================
// GET BOOKING BY PNR
// ==========================================================

function getBookingByPNR(pnr) {

    return bookings.find(
        booking =>
            booking.pnr === pnr
    );

}


// ==========================================================
// GET BOOKINGS BY USER
// ==========================================================

function getBookingsByUser(userId) {

    return bookings.filter(
        booking =>
            String(booking.userId) ===
            String(userId)
    );

}


// ==========================================================
// GENERATE PNR
// ==========================================================

function generatePNR() {

    const timestamp =
        Date.now()
            .toString()
            .slice(-6);

    const random =
        Math.floor(
            100 + Math.random() * 900
        );


    return `${timestamp}${random}`;

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