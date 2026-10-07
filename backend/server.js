
const express = require("express");
const cors = require("cors");

// ==========================================================
// DATABASE
// ==========================================================

const db = require("./db");


// ==========================================================
// ROUTES
// ==========================================================

const authRoutes =
    require("./routes/authRoutes");

const trainRoutes =
    require("./routes/trainRoutes");

const seatRoutes =
    require("./routes/seatRoutes");

const bookingRoutes =
    require("./routes/bookingRoutes");

const paymentRoutes =
    require("./routes/paymentRoutes");


// ==========================================================
// CREATE EXPRESS APP
// ==========================================================

const app = express();


// ==========================================================
// MIDDLEWARE
// ==========================================================

// Allow frontend requests
app.use(cors());


// Read JSON request body
app.use(express.json());


// Read form data
app.use(
    express.urlencoded({
        extended: true
    })
);


// ==========================================================
// ROOT API
// ==========================================================

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message:
            "Train Booking Backend Running",

        server:
            "http://localhost:5000"

    });

});


// ==========================================================
// AUTH ROUTES
// ==========================================================

app.use(
    "/api/auth",
    authRoutes
);


// ==========================================================
// TRAIN ROUTES
// ==========================================================

app.use(
    "/api/trains",
    trainRoutes
);


// ==========================================================
// SEAT ROUTES
// ==========================================================

app.use(
    "/api/seats",
    seatRoutes
);


// ==========================================================
// BOOKING ROUTES
// ==========================================================

app.use(
    "/api/bookings",
    bookingRoutes
);


// ==========================================================
// PAYMENT ROUTES
// ==========================================================

app.use(
    "/api/payments",
    paymentRoutes
);


// ==========================================================
// 404 HANDLER
// ==========================================================

app.use(
    (req, res) => {

        res.status(404).json({

            success: false,

            message:
                `API route not found: ${req.method} ${req.originalUrl}`

        });

    }
);


// ==========================================================
// ERROR HANDLER
// ==========================================================

app.use(
    (err, req, res, next) => {

        console.error(
            "SERVER ERROR:",
            err
        );

        res.status(500).json({

            success: false,

            message:
                "Internal server error"

        });

    }
);


// ==========================================================
// START SERVER
// ==========================================================

const PORT = 5000;


app.listen(
    PORT,
    () => {

        console.log(
            "===================================="
        );

        console.log(
            "Train Booking Backend Started"
        );

        console.log(
            `Server: http://localhost:${PORT}`
        );

        console.log(
            "===================================="
        );

        console.log(
            "Database: MySQL / railbook"
        );

        console.log(
            "Auth:     /api/auth"
        );

        console.log(
            "Trains:   /api/trains"
        );

        console.log(
            "Seats:    /api/seats"
        );

        console.log(
            "Bookings: /api/bookings"
        );

        console.log(
            "Payments: /api/payments"
        );

        console.log(
            "===================================="
        );

    }
);