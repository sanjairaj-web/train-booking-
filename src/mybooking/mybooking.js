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

    if (backBtn) {

        backBtn.addEventListener(
            "click",
            () => {

                navigate(
                    "search",
                    app
                );

            }
        );

    }


    // =====================================================
    // LOAD BOOKINGS
    // =====================================================

    loadBookings(
        bookingList,
        app
    );

}


// ==========================================================
// LOAD BOOKINGS FROM BACKEND
// ==========================================================

async function loadBookings(
    container,
    app
) {

    // Loading UI

    container.innerHTML = `

        <div class="loading-bookings">

            <div class="loading-icon">
                🎫
            </div>

            <h2>
                Loading your bookings...
            </h2>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        // ==================================================
        // GET LOGGED-IN USER
        // ==================================================

        const loggedInUser =
            getStorageObject(
                "loggedInUser"
            );


        let url =
            "http://localhost:5000/api/bookings";


        // ==================================================
        // USER-SPECIFIC BOOKINGS
        // ==================================================

        if (
            loggedInUser &&
            loggedInUser.id
        ) {

            url =
                `http://localhost:5000/api/bookings/user/${loggedInUser.id}`;

        }


        // ==================================================
        // API CALL
        // ==================================================

        const response =
            await fetch(
                url
            );


        const data =
            await response.json();


        console.log(
            "Bookings API Response:",
            data
        );


        // ==================================================
        // API ERROR
        // ==================================================

        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load bookings"
            );

        }


        // ==================================================
        // NO BOOKINGS
        // ==================================================

        if (
            !data.bookings ||
            data.bookings.length === 0
        ) {

            renderEmpty(
                container,
                app
            );

            return;

        }


        // ==================================================
        // RENDER BOOKINGS
        // ==================================================

        renderBookings(
            container,
            app,
            data.bookings
        );

    }

    catch (error) {

        console.error(
            "MY BOOKING ERROR:",
            error
        );


        container.innerHTML = `

            <div class="empty-bookings">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h2>
                    Unable to load bookings
                </h2>

                <p>
                    Please make sure the backend
                    server is running.
                </p>

                <button
                    id="retryBookingBtn"
                    class="primary-btn"
                >
                    Try Again
                </button>

            </div>

        `;


        const retryButton =
            document.getElementById(
                "retryBookingBtn"
            );


        if (retryButton) {

            retryButton.addEventListener(
                "click",
                () => {

                    loadBookings(
                        container,
                        app
                    );

                }
            );

        }

    }

}


// ==========================================================
// RENDER ALL BOOKINGS
// ==========================================================

function renderBookings(
    container,
    app,
    bookings
) {

    container.innerHTML = "";


    bookings
        .slice()
        .reverse()
        .forEach(
            booking => {

                container.insertAdjacentHTML(
                    "beforeend",
                    createBookingHTML(
                        booking
                    )
                );

            }
        );


    // ======================================================
    // VIEW TICKET BUTTONS
    // ======================================================

    document
        .querySelectorAll(
            ".view-ticket-btn"
        )
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const pnr =
                            button.dataset.pnr;


                        localStorage.setItem(
                            "bookingPNR",
                            pnr
                        );


                        navigate(
                            "ticket",
                            app
                        );

                    }
                );

            }
        );

}


// ==========================================================
// BOOKING CARD HTML
// ==========================================================

function createBookingHTML(
    booking
) {

    const train =
        booking.train ||
        {};


    const journey =
        booking.journey ||
        {};


    const passenger =
        booking.passenger ||
        {};


    const payment =
        booking.payment ||
        {};


    const seats =
        Array.isArray(
            booking.seats
        )
            ? booking.seats
            : [];


    const coach =
        booking.coach ||
        "S1";


    const total =
        Number(
            payment.total ||
            payment.amount ||
            0
        );


    const paymentMethod =
        payment.method ||
        payment.paymentMethod ||
        "UPI";


    return `

        <article class="booking-card">


            <!-- ======================================
                 HEADER
            ======================================= -->

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

                    ${escapeHTML(
                        booking.status ||
                        "CONFIRMED"
                    )}

                </div>

            </div>


            <!-- ======================================
                 PNR
            ======================================= -->

            <div class="pnr-section">

                <div class="pnr-item">

                    <span>
                        PNR NUMBER
                    </span>

                    <strong>
                        ${escapeHTML(
                            booking.pnr ||
                            "-"
                        )}
                    </strong>

                </div>


                <div class="pnr-item">

                    <span>
                        BOOKED ON
                    </span>

                    <strong>
                        ${formatBookedDate(
                            booking.bookedAt
                        )}
                    </strong>

                </div>

            </div>


            <!-- ======================================
                 JOURNEY
            ======================================= -->

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


            <!-- ======================================
                 PASSENGER
            ======================================= -->

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
                                "-"
                            )}
                        </strong>

                    </div>

                </div>

            </section>


            <!-- ======================================
                 SEAT
            ======================================= -->

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


            <!-- ======================================
                 PAYMENT
            ======================================= -->

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
                            Total Paid
                        </span>

                        <strong>
                            ₹${formatMoney(
                                total
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
                            payment.transactionId ||
                            payment.transactionID ||
                            "-"
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


            <!-- ======================================
                 ACTIONS
            ======================================= -->

            <div class="booking-actions">

                <button
                    class="secondary-btn view-ticket-btn"
                    data-pnr="${escapeHTML(
                        booking.pnr
                    )}"
                >
                    🎫 View Ticket
                </button>


                <button
                    class="primary-btn view-ticket-btn"
                    data-pnr="${escapeHTML(
                        booking.pnr
                    )}"
                >
                    🎫 Ticket
                </button>

            </div>


        </article>

    `;

}


// ==========================================================
// EMPTY BOOKINGS
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

    }

    catch {

        return null;

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
// BOOKED DATE
// ==========================================================

function formatBookedDate(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return "-";

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

    const key =
        String(
            method || ""
        )
        .toLowerCase()
        .replace(
            /[\s_-]/g,
            ""
        );


    const methods = {

        upi: "UPI",

        card: "Card",

        creditcard:
            "Credit Card",

        debitcard:
            "Debit Card",

        netbanking:
            "Net Banking",

        wallet:
            "Wallet"

    };


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