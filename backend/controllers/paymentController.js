const paymentModel =
    require("../models/paymentModel");

const bookingModel =
    require("../models/bookingModel");


function makePayment(req, res) {

    const {
        bookingId,
        amount,
        method
    } = req.body;


    const booking =
        bookingModel.getBooking(
            bookingId
        );


    if (!booking) {

        return res.status(404).json({

            success: false,

            message: "Booking not found"

        });

    }


    const payment =
        paymentModel.createPayment({

            bookingId,
            amount,
            method

        });


    // After successful payment
    booking.status = "CONFIRMED";


    res.json({

        success: true,

        message: "Payment successful",

        payment,

        booking

    });

}


function getPayment(req, res) {

    const payment =
        paymentModel.getPayment(
            req.params.id
        );


    if (!payment) {

        return res.status(404).json({

            success: false,

            message: "Payment not found"

        });

    }


    res.json({

        success: true,

        payment

    });

}


module.exports = {
    makePayment,
    getPayment
};