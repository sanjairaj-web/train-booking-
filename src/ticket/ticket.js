import "./ticket.css";
import ticketHTML from "./ticket.html";

import { jsPDF } from "jspdf";

import { navigate } from "../router.js";


export function showTicket(app) {

    // =====================================================
    // LOAD HTML
    // =====================================================

    app.innerHTML = ticketHTML;


    // =====================================================
    // GET ELEMENTS
    // =====================================================

    const trainName =
        app.querySelector("#trainName");

    const trainNumber =
        app.querySelector("#trainNumber");

    const departureTime =
        app.querySelector("#departureTime");

    const arrivalTime =
        app.querySelector("#arrivalTime");

    const fromStation =
        app.querySelector("#fromStation");

    const toStation =
        app.querySelector("#toStation");

    const journeyDuration =
        app.querySelector("#journeyDuration");

    const journeyDate =
        app.querySelector("#journeyDate");

    const pnrNumber =
        app.querySelector("#pnrNumber");

    const passengerDetails =
        app.querySelector("#passengerDetails");

    const coachNumber =
        app.querySelector("#coachNumber");

    const seatNumber =
        app.querySelector("#seatNumber");

    const travelClass =
        app.querySelector("#travelClass");

    const baseFare =
        app.querySelector("#baseFare");

    const convenienceFee =
        app.querySelector("#convenienceFee");

    const gst =
        app.querySelector("#gst");

    const totalFare =
        app.querySelector("#totalFare");

    const transactionId =
        app.querySelector("#transactionId");

    const paymentMethod =
        app.querySelector("#paymentMethod");

    const bookingDate =
        app.querySelector("#bookingDate");

    const downloadBtn =
        app.querySelector("#downloadBtn");

    const printBtn =
        app.querySelector("#printBtn");

    const homeBtn =
        app.querySelector("#homeBtn");


    // =====================================================
    // LOAD DATA
    // =====================================================

    const train =
        getStorageObject(
            "selectedTrain"
        ) || {};


    const journey =
        getStorageObject(
            "selectedJourney"
        ) || {};


    const passenger =
        getStorageObject(
            "passengerDetails"
        ) ||
        getStorageObject(
            "passenger"
        ) ||
        {};


    const payment =
        getStorageObject(
            "paymentDetails"
        ) ||
        getStorageObject(
            "payment"
        ) ||
        {};


    const seats =
        getStorageArray(
            "selectedSeats"
        );


    const savedCoach =
        localStorage.getItem(
            "selectedCoach"
        );


    const savedTotal =
        Number(
            localStorage.getItem(
                "totalFare"
            ) || 0
        );


    // =====================================================
    // PNR
    // =====================================================

    let pnr =
        localStorage.getItem(
            "bookingPNR"
        );


    if (!pnr) {

        pnr =
            generatePNR();

        localStorage.setItem(
            "bookingPNR",
            pnr
        );

    }


    // =====================================================
    // FARE
    // =====================================================

    const passengerCount =
        Math.max(
            seats.length,
            Number(
                journey.passengers
            ) || 1
        );


    const base =
        Number(
            payment.baseFare ||
            payment.base ||
            train.fare ||
            0
        ) *
        passengerCount;


    const convenience =
        Number(
            payment.convenienceFee ||
            payment.convenience ||
            0
        );


    const tax =
        Number(
            payment.gst ||
            payment.tax ||
            0
        );


    const total =
        Number(
            payment.total ||
            payment.amount ||
            savedTotal ||
            (
                base +
                convenience +
                tax
            )
        );


    // =====================================================
    // TRAIN
    // =====================================================

    trainName.textContent =
        train.name ||
        "Train";


    trainNumber.textContent =
        `Train No. ${
            train.number || "-"
        }`;


    departureTime.textContent =
        train.departure ||
        "-";


    arrivalTime.textContent =
        train.arrival ||
        "-";


    fromStation.textContent =
        train.from ||
        journey.from ||
        "-";


    toStation.textContent =
        train.to ||
        journey.to ||
        "-";


    journeyDuration.textContent =
        train.duration ||
        "-";


    journeyDate.textContent =
        formatDate(
            journey.journeyDate
        );


    // =====================================================
    // PNR
    // =====================================================

    pnrNumber.textContent =
        pnr;


    // =====================================================
    // PASSENGER
    // =====================================================

    renderPassenger(
        passengerDetails,
        passenger
    );


    // =====================================================
    // SEAT
    // =====================================================

    coachNumber.textContent =
        savedCoach ||
        passenger.coach ||
        localStorage.getItem(
            "coach"
        ) ||
        "S1";


    seatNumber.textContent =
        seats.length
            ? seats.join(", ")
            : passenger.seat ||
              passenger.seats ||
              "-";


    travelClass.textContent =
        journey.travelClass ||
        train.class ||
        "Sleeper";


    // =====================================================
    // PAYMENT
    // =====================================================

    baseFare.textContent =
        `₹${formatMoney(base)}`;


    convenienceFee.textContent =
        `₹${formatMoney(convenience)}`;


    gst.textContent =
        `₹${formatMoney(tax)}`;


    totalFare.textContent =
        `₹${formatMoney(total)}`;


    // =====================================================
    // TRANSACTION
    // =====================================================

    const transaction =
        payment.transactionId ||
        payment.transactionID ||
        payment.txnId ||
        generateTransactionId();


    transactionId.textContent =
        `Transaction ID: ${transaction}`;


    const method =
        payment.method ||
        payment.paymentMethod ||
        "UPI";


    paymentMethod.textContent =
        formatPaymentMethod(
            method
        );


    // =====================================================
    // BOOKING DATE
    // =====================================================

    bookingDate.textContent =
        new Date().toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );


    // =====================================================
    // PDF
    // =====================================================

    downloadBtn.addEventListener(
        "click",
        () => {

            downloadTicketPDF({

                train,

                journey,

                passenger,

                seats,

                coach:
                    coachNumber.textContent,

                pnr,

                base,

                convenience,

                tax,

                total,

                transaction,

                method

            });

        }
    );


    // =====================================================
    // PRINT
    // =====================================================

    printBtn.addEventListener(
        "click",
        () => {

            window.print();

        }
    );


    // =====================================================
    // NEW BOOKING
    // =====================================================

    homeBtn.addEventListener(
        "click",
        () => {

            clearBookingData();

            navigate(
                "search",
                app
            );

        }
    );

}


/* ==========================================================
   PASSENGER
========================================================== */

function renderPassenger(
    container,
    passenger
) {

    if (!container) {

        console.error(
            "❌ #passengerDetails not found in ticket.html"
        );

        return;

    }


    const name =
        passenger.name ||
        passenger.fullName ||
        "Passenger";


    const age =
        passenger.age ||
        "-";


    const gender =
        passenger.gender ||
        "-";


    const mobile =
        passenger.mobile ||
        passenger.phone ||
        passenger.phoneNumber ||
        "-";


    container.innerHTML = `

        <div class="passenger-card">

            <span>
                NAME
            </span>

            <strong>
                ${escapeHTML(name)}
            </strong>

        </div>


        <div class="passenger-card">

            <span>
                AGE
            </span>

            <strong>
                ${escapeHTML(age)}
            </strong>

        </div>


        <div class="passenger-card">

            <span>
                GENDER
            </span>

            <strong>
                ${escapeHTML(gender)}
            </strong>

        </div>


        <div class="passenger-card">

            <span>
                MOBILE
            </span>

            <strong>
                ${escapeHTML(mobile)}
            </strong>

        </div>

    `;

}


/* ==========================================================
   PDF
========================================================== */

function downloadTicketPDF(
    data
) {

    const doc =
        new jsPDF({
            unit: "mm",
            format: "a4"
        });


    const {

        train,

        journey,

        passenger,

        seats,

        coach,

        pnr,

        base,

        convenience,

        tax,

        total,

        transaction,

        method

    } = data;


    // =====================================================
    // BACKGROUND
    // =====================================================

    doc.setFillColor(
        247,
        249,
        252
    );

    doc.rect(
        0,
        0,
        210,
        297,
        "F"
    );


    // =====================================================
    // HEADER
    // =====================================================

    doc.setFillColor(
        49,
        94,
        251
    );

    doc.rect(
        0,
        0,
        210,
        35,
        "F"
    );


    doc.setTextColor(
        255,
        255,
        255
    );


    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        22
    );


    doc.text(
        "RailBook",
        18,
        15
    );


    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        9
    );


    doc.text(
        "Train Ticket Booking",
        18,
        23
    );


    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        "E-TICKET",
        165,
        18
    );


    // =====================================================
    // CONFIRMATION
    // =====================================================

    doc.setTextColor(
        31,
        150,
        105
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        17
    );

    doc.text(
        "BOOKING CONFIRMED",
        18,
        50
    );


    doc.setTextColor(
        100,
        110,
        125
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        9
    );

    doc.text(
        "Your RailBook train ticket has been successfully confirmed.",
        18,
        57
    );


    // =====================================================
    // PNR
    // =====================================================

    drawPDFBox(
        doc,
        18,
        67,
        174,
        29
    );


    doc.setTextColor(
        125,
        135,
        150
    );

    doc.setFontSize(
        8
    );

    doc.text(
        "PNR NUMBER",
        26,
        77
    );


    doc.setTextColor(
        49,
        94,
        251
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        16
    );

    doc.text(
        pnr,
        26,
        88
    );


    doc.setTextColor(
        31,
        150,
        105
    );

    doc.setFontSize(
        9
    );

    doc.text(
        "✓ Confirmed",
        157,
        83
    );


    // =====================================================
    // TRAIN
    // =====================================================

    drawPDFTitle(
        doc,
        "TRAIN DETAILS",
        110
    );


    drawPDFBox(
        doc,
        18,
        117,
        174,
        55
    );


    doc.setTextColor(
        35,
        45,
        60
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        14
    );

    doc.text(
        train.name ||
        "Train",
        26,
        130
    );


    doc.setTextColor(
        120,
        130,
        145
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        8
    );

    doc.text(
        `Train No. ${
            train.number || "-"
        }`,
        26,
        138
    );


    drawPDFInfo(
        doc,
        "DEPARTURE",
        train.from ||
        journey.from ||
        "-",
        train.departure ||
        "-",
        26,
        151
    );


    drawPDFInfo(
        doc,
        "ARRIVAL",
        train.to ||
        journey.to ||
        "-",
        train.arrival ||
        "-",
        122,
        151
    );


    // =====================================================
    // JOURNEY
    // =====================================================

    drawPDFTitle(
        doc,
        "JOURNEY DETAILS",
        185
    );


    drawPDFBox(
        doc,
        18,
        192,
        174,
        40
    );


    drawPDFSmallInfo(
        doc,
        "Journey Date",
        formatDate(
            journey.journeyDate
        ),
        26,
        203
    );


    drawPDFSmallInfo(
        doc,
        "Coach",
        coach,
        92,
        203
    );


    drawPDFSmallInfo(
        doc,
        "Seat(s)",
        seats.length
            ? seats.join(", ")
            : "-",
        145,
        203
    );


    drawPDFSmallInfo(
        doc,
        "Class",
        journey.travelClass ||
        "Sleeper",
        26,
        220
    );


    drawPDFSmallInfo(
        doc,
        "Passenger",
        passenger.name ||
        passenger.fullName ||
        "-",
        92,
        220
    );


    drawPDFSmallInfo(
        doc,
        "Payment",
        formatPaymentMethod(
            method
        ),
        145,
        220
    );


    // =====================================================
    // PAYMENT
    // =====================================================

    drawPDFTitle(
        doc,
        "PAYMENT DETAILS",
        245
    );


    drawPDFBox(
        doc,
        18,
        252,
        174,
        31
    );


    drawPDFPaymentRow(
        doc,
        "Base Fare",
        `₹${formatMoney(base)}`,
        261
    );


    drawPDFPaymentRow(
        doc,
        "Convenience Fee",
        `₹${formatMoney(convenience)}`,
        269
    );


    drawPDFPaymentRow(
        doc,
        "GST",
        `₹${formatMoney(tax)}`,
        277
    );


    // =====================================================
    // TOTAL
    // =====================================================

    doc.setFillColor(
        49,
        94,
        251
    );


    doc.roundedRect(
        18,
        287,
        174,
        15,
        3,
        3,
        "F"
    );


    doc.setTextColor(
        255,
        255,
        255
    );


    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        11
    );


    doc.text(
        "TOTAL PAID",
        26,
        296
    );


    doc.text(
        `₹${formatMoney(total)}`,
        157,
        296
    );


    // =====================================================
    // SAVE
    // =====================================================

    doc.save(
        `RailBook-${pnr}.pdf`
    );

}


/* ==========================================================
   PDF HELPERS
========================================================== */

function drawPDFBox(
    doc,
    x,
    y,
    width,
    height
) {

    doc.setFillColor(
        255,
        255,
        255
    );

    doc.setDrawColor(
        228,
        232,
        239
    );

    doc.roundedRect(
        x,
        y,
        width,
        height,
        4,
        4,
        "FD"
    );

}


function drawPDFTitle(
    doc,
    title,
    y
) {

    doc.setTextColor(
        49,
        94,
        251
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        8
    );

    doc.text(
        title,
        18,
        y
    );

}


function drawPDFInfo(
    doc,
    label,
    station,
    time,
    x,
    y
) {

    doc.setTextColor(
        135,
        145,
        158
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        7
    );

    doc.text(
        label,
        x,
        y
    );


    doc.setTextColor(
        35,
        45,
        60
    );

    doc.setFontSize(
        11
    );

    doc.text(
        station,
        x,
        y + 9
    );


    doc.setFontSize(
        9
    );

    doc.text(
        time,
        x,
        y + 16
    );

}


function drawPDFSmallInfo(
    doc,
    label,
    value,
    x,
    y
) {

    doc.setTextColor(
        135,
        145,
        158
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        7
    );

    doc.text(
        label,
        x,
        y
    );


    doc.setTextColor(
        40,
        50,
        65
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.setFontSize(
        8
    );

    doc.text(
        String(value),
        x,
        y + 7
    );

}


function drawPDFPaymentRow(
    doc,
    label,
    value,
    y
) {

    doc.setTextColor(
        95,
        105,
        120
    );

    doc.setFont(
        "helvetica",
        "normal"
    );

    doc.setFontSize(
        7
    );

    doc.text(
        label,
        27,
        y
    );


    doc.setTextColor(
        40,
        50,
        65
    );

    doc.setFont(
        "helvetica",
        "bold"
    );

    doc.text(
        value,
        165,
        y
    );

}


/* ==========================================================
   STORAGE
========================================================== */

function getStorageObject(
    key
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (!value) {

            return null;

        }


        return JSON.parse(
            value
        );

    } catch (error) {

        console.error(
            `Unable to read ${key}`,
            error
        );

        return null;

    }

}


function getStorageArray(
    key
) {

    try {

        const value =
            localStorage.getItem(
                key
            );


        if (!value) {

            return [];

        }


        const parsed =
            JSON.parse(
                value
            );


        if (
            Array.isArray(parsed)
        ) {

            return parsed;

        }


        return [parsed];

    } catch (error) {

        const value =
            localStorage.getItem(
                key
            );


        if (!value) {

            return [];

        }


        return value
            .split(",")
            .map(
                item =>
                    item.trim()
            )
            .filter(Boolean);

    }

}


/* ==========================================================
   HELPERS
========================================================== */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(
            `${value}T00:00:00`
        );


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function formatMoney(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-IN"
    );

}


function formatPaymentMethod(
    method
) {

    const methods = {

        upi:
            "UPI",

        card:
            "Card",

        creditcard:
            "Credit Card",

        debitcard:
            "Debit Card",

        netbanking:
            "Net Banking",

        wallet:
            "Wallet"

    };


    const key =
        String(
            method || ""
        )
        .toLowerCase()
        .replace(
            /[\s_-]/g,
            ""
        );


    return (
        methods[key] ||
        method ||
        "UPI"
    );

}


/* ==========================================================
   PNR
========================================================== */

function generatePNR() {

    const random =
        Math.floor(
            1000000000 +
            Math.random() *
            9000000000
        );


    return `RB${random}`;

}


/* ==========================================================
   TRANSACTION
========================================================== */

function generateTransactionId() {

    return `TXN${Date.now()}`;

}


/* ==========================================================
   ESCAPE HTML
========================================================== */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* ==========================================================
   CLEAR BOOKING
========================================================== */

function clearBookingData() {

    const keys = [

        "selectedTrain",

        "selectedJourney",

        "selectedSeats",

        "selectedCoach",

        "coach",

        "seat",

        "totalFare",

        "passengerDetails",

        "passenger",

        "paymentDetails",

        "payment",

        "bookingPNR"

    ];


    keys.forEach(
        key => {

            localStorage.removeItem(
                key
            );

        }
    );

}