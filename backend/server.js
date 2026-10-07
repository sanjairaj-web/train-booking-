const express = require("express");
const cors = require("cors");

// ==========================================================
// DATABASE
// ==========================================================

const db = require("./db");

// ==========================================================
// ROUTES
// ==========================================================

const authRoutes = require("./routes/authRoutes");
const trainRoutes = require("./routes/trainRoutes");
const seatRoutes = require("./routes/seatRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// ==========================================================
// CREATE EXPRESS APP
// ==========================================================

const app = express();

// ==========================================================
// MIDDLEWARE
// ==========================================================

app.use(
    cors({
        origin: true,
        credentials: true
    })
);

app.use(express.json());

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
        message: "Train Booking Backend Running"
    });
});

// ==========================================================
// AUTH ROUTES
// ==========================================================

app.use("/api/auth", authRoutes);

// ==========================================================
// TRAIN ROUTES
// ==========================================================

app.use("/api/trains", trainRoutes);

// ==========================================================
// SEAT ROUTES
// ==========================================================

app.use("/api/seats", seatRoutes);

// ==========================================================
// BOOKING ROUTES
// ==========================================================

app.use("/api/bookings", bookingRoutes);

// ==========================================================
// PAYMENT ROUTES
// ==========================================================

app.use("/api/payments", paymentRoutes);

// ==========================================================
// 404 HANDLER
// ==========================================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `API route not found: ${req.method} ${req.originalUrl}`
    });
});

// ==========================================================
// ERROR HANDLER
// ==========================================================

app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
});

// ==========================================================
// VERCEL EXPORT
// ==========================================================

module.exports = app;