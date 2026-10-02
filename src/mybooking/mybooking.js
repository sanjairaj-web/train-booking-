import "./mybooking.css";
import myBookingHTML from "./mybooking.html";

import { navigate } from "../router.js";


export function showMyBooking(app) {

    // =====================================================
    // LOAD PAGE
    // =====================================================

    app.innerHTML = myBookingHTML;


    // =====================================================
    // ELEMENTS
    // =====================================================

    const bookingList =
        document.getElementById(
            "bookingList"
        );


    const backBtn =
        document.getElementById(
            "backBtn"
        );


    // =====================================================
    // BACK TO SEARCH
    // =====================================================

    backBtn.addEventListener(
        "click",
        () => {

            navigate(
                "search",
                app
            );

        }
    );


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


    const coach =
        localStorage.getItem(
            "selectedCoach"
        ) ||
        localStorage.getItem(
            "coach"
        ) ||
        "S1";


    const pnr =
        localStorage.getItem(
            "bookingPNR"
        );


    // =====================================================
    // CHECK BOOKING
    // =====================================================

    if (
        !train.name &&
        !pnr
    ) {

        renderEmpty(
            bookingList,
            app
        );

        return;

    }


    // =====================================================
    // FARE
    // =====================================================

    const seatCount =
        Math.max(
            seats.length,
            Number(
                journey.passengers || 1
            )
        );


    const baseFare =
        Number(
            payment.baseFare ??
            payment.base ??
            train.fare ??
            0
        ) *
        seatCount;


    const convenienceFee =
        Number(
            payment.convenienceFee ??
            payment.convenience ??
            0
        );


    const gst =
        Number(
            payment.gst ??
            payment.tax ??
            0
        );


    let totalFare =
        Number(
            payment.total ??
            payment.amount ??
            0
        );


    if (!totalFare) {

        const savedTotal =
            Number(
                localStorage.getItem(
                    "totalFare"
                ) || 0
            );


        totalFare =
            savedTotal ||
            (
                baseFare +
                convenienceFee +
                gst
            );

    }


    // =====================================================
    // TRANSACTION
    // =====================================================

    const transactionId =
        payment.transactionId ||
        payment.transactionID ||
        payment.txnId ||
        "-";


    const paymentMethod =
        payment.method ||
        payment.paymentMethod ||
        "UPI";


    // =====================================================
    // RENDER
    // =====================================================

    bookingList.innerHTML = `

        <article class="booking-card">


            <!-- ==========================================
                 BOOKING HEADER
            =========================================== -->

            <div class="booking-top">

                <div>

                    <span class="booking-label">
                        BOOKING CONFIRMED
                    </span>

                    <h2>
                        ${escapeHTML(
                            train.name ||
                            "RailBook Train"
                        )}
                    </h2>

                    <div class="train-number">
                        Train No.
                        ${escapeHTML(
                            train.number ||
                            "-"
                        )}
                    </div>

                </div>


                <div class="booking-status">

                    <span class="status-dot">
                        ●
                    </span>

                    Confirmed

                </div>

            </div>


            <!-- ==========================================
                 PNR
            =========================================== -->

            <div class="pnr-section">

                <div class="pnr-item">

                    <span>
                        PNR NUMBER
                    </span>

                    <strong>
                        ${escapeHTML(
                            pnr || "-"
                        )}
                    </strong>

                </div>


                <div class="pnr-item booking-date">

                    <span>
                        BOOKED ON
                    </span>

                    <strong>
                        ${formatToday()}
                    </strong>

                </div>

            </div>


            <!-- ==========================================
                 TRAIN JOURNEY
            =========================================== -->

            <section class="booking-section">

                <div class="section-title">

                    <span>
                        TRAIN DETAILS
                    </span>

                    <h3>
                        Journey Information
                    </h3>

                </div>


                <div class="journey-grid">


                    <div class="station-block">

                        <span>
                            DEPARTURE
                        </span>

                        <strong>
                            ${escapeHTML(
                                train.departure ||
                                "-"
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                train.from ||
                                journey.from ||
                                "-"
                            )}
                        </p>

                    </div>


                    <div class="journey-middle">

                        <span>
                            ${escapeHTML(
                                train.duration ||
                                "-"
                            )}
                        </span>

                        <div class="journey-line">
                            ● ───────── ●
                        </div>

                        <span>
                            ${escapeHTML(
                                train.type ||
                                "Train"
                            )}
                        </span>

                    </div>


                    <div class="station-block">

                        <span>
                            ARRIVAL
                        </span>

                        <strong>
                            ${escapeHTML(
                                train.arrival ||
                                "-"
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                train.to ||
                                journey.to ||
                                "-"
                            )}
                        </p>

                    </div>

                </div>


                <div class="journey-date">

                    <span>
                        JOURNEY DATE
                    </span>

                    <strong>
                        ${formatDate(
                            journey.journeyDate
                        )}
                    </strong>

                </div>

            </section>


            <!-- ==========================================
                 PASSENGER DETAILS
            =========================================== -->

            <section class="booking-section">

                <div class="section-title">

                    <span>
                        PASSENGER DETAILS
                    </span>

                    <h3>
                        Passenger Information
                    </h3>

                </div>


                <div class="passenger-grid">


                    <div class="info-card">

                        <span>
                            NAME
                        </span>

                        <strong>
                            ${escapeHTML(
                                passenger.name ||
                                passenger.fullName ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="info-card">

                        <span>
                            AGE
                        </span>

                        <strong>
                            ${escapeHTML(
                                passenger.age ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="info-card">

                        <span>
                            GENDER
                        </span>

                        <strong>
                            ${escapeHTML(
                                passenger.gender ||
                                "-"
                            )}
                        </strong>

                    </div>


                    <div class="info-card">

                        <span>
                            MOBILE
                        </span>

                        <strong>
                            ${escapeHTML(
                                passenger.mobile ||
                                passenger.phone ||
                                passenger.phoneNumber ||
                                "-"
                            )}
                        </strong>

                    </div>

                </div>

            </section>


            <!-- ==========================================
                 SEAT DETAILS
            =========================================== -->

            <section class="booking-section">

                <div class="section-title">

                    <span>
                        SEAT DETAILS
                    </span>

                    <h3>
                        Reservation Details
                    </h3>

                </div>


                <div class="seat-grid">


                    <div class="info-card">

                        <span>
                            COACH
                        </span>

                        <strong>
                            ${escapeHTML(
                                coach
                            )}
                        </strong>

                    </div>


                    <div class="info-card">

                        <span>
                            SEAT NUMBER
                        </span>

                        <strong>
                            ${escapeHTML(
                                seats.length
                                    ? seats.join(", ")
                                    : "-"
                            )}
                        </strong>

                    </div>


                    <div class="info-card">

                        <span>
                            TRAVEL CLASS
                        </span>

                        <strong>
                            ${escapeHTML(
                                journey.travelClass ||
                                train.class ||
                                "Sleeper"
                            )}
                        </strong>

                    </div>

                </div>

            </section>


            <!-- ==========================================
                 PAYMENT DETAILS
            =========================================== -->

            <section class="booking-section">

                <div class="section-title">

                    <span>
                        PAYMENT DETAILS
                    </span>

                    <h3>
                        Fare Summary
                    </h3>

                </div>


                <div class="fare-list">

                    <div class="fare-row">

                        <span>
                            Base Fare
                        </span>

                        <strong>
                            ₹${formatMoney(
                                baseFare
                            )}
                        </strong>

                    </div>


                    <div class="fare-row">

                        <span>
                            Convenience Fee
                        </span>

                        <strong>
                            ₹${formatMoney(
                                convenienceFee
                            )}
                        </strong>

                    </div>


                    <div class="fare-row">

                        <span>
                            GST
                        </span>

                        <strong>
                            ₹${formatMoney(
                                gst
                            )}
                        </strong>

                    </div>


                    <div class="fare-row fare-total">

                        <span>
                            Total Paid
                        </span>

                        <strong>
                            ₹${formatMoney(
                                totalFare
                            )}
                        </strong>

                    </div>

                </div>


                <div class="transaction-info">

                    <span>
                        Transaction ID
                    </span>

                    <strong>
                        ${escapeHTML(
                            transactionId
                        )}
                    </strong>


                    <span>
                        Payment
                    </span>

                    <strong>
                        ${escapeHTML(
                            formatPaymentMethod(
                                paymentMethod
                            )
                        )}
                    </strong>

                </div>

            </section>


            <!-- ==========================================
                 ACTIONS
            =========================================== -->

            <div class="booking-actions">

                <button
                    id="viewTicketBtn"
                    class="secondary-btn"
                >
                    🎫 View Ticket
                </button>


                <button
                    id="downloadBtn"
                    class="primary-btn"
                >
                    ↓ Download Ticket
                </button>

            </div>


        </article>

    `;


    // =====================================================
    // VIEW TICKET
    // =====================================================

    document
        .getElementById(
            "viewTicketBtn"
        )
        .addEventListener(
            "click",
            () => {

                navigate(
                    "ticket",
                    app
                );

            }
        );


    // =====================================================
    // DOWNLOAD TICKET
    // =====================================================

    document
        .getElementById(
            "downloadBtn"
        )
        .addEventListener(
            "click",
            () => {

                navigate(
                    "ticket",
                    app
                );

            }
        );

}


// ==========================================================
// EMPTY BOOKING
// ==========================================================

function renderEmpty(
    container,
    app
) {

    container.innerHTML = `

        <div class="empty-bookings">

            <div class="empty-icon">
                🎫
            </div>

            <h2>
                No bookings yet
            </h2>

            <p>
                Your confirmed train tickets
                will appear here.
            </p>

            <button
                id="bookTrainBtn"
                class="primary-btn"
            >
                Book a Train →
            </button>

        </div>

    `;


    document
        .getElementById(
            "bookTrainBtn"
        )
        .addEventListener(
            "click",
            () => {

                navigate(
                    "search",
                    app
                );

            }
        );

}


// ==========================================================
// STORAGE OBJECT
// ==========================================================

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


// ==========================================================
// STORAGE ARRAY
// ==========================================================

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

    } catch {

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


// ==========================================================
// DATE
// ==========================================================

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


// ==========================================================
// TODAY
// ==========================================================

function formatToday() {

    return new Date()
        .toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

}


// ==========================================================
// MONEY
// ==========================================================

function formatMoney(
    value
) {

    return Number(
        value || 0
    ).toLocaleString(
        "en-IN"
    );

}


// ==========================================================
// PAYMENT METHOD
// ==========================================================

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


// ==========================================================
// ESCAPE HTML
// ==========================================================

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