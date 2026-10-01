import "./passenger.css";
import passengerHTML from "./passenger.html";

import { navigate } from "../router.js";


// =========================================================
// SHOW PASSENGER PAGE
// =========================================================

export function showPassenger(app) {

    app.innerHTML = passengerHTML;


    // =====================================================
    // ELEMENTS
    // =====================================================

    const trainName =
        document.getElementById("trainName");

    const trainNumber =
        document.getElementById("trainNumber");

    const fromStation =
        document.getElementById("fromStation");

    const toStation =
        document.getElementById("toStation");

    const departureTime =
        document.getElementById("departureTime");

    const arrivalTime =
        document.getElementById("arrivalTime");

    const journeyDuration =
        document.getElementById("journeyDuration");

    const journeyDate =
        document.getElementById("journeyDate");

    const summaryFrom =
        document.getElementById("summaryFrom");

    const summaryTo =
        document.getElementById("summaryTo");

    const summaryTrain =
        document.getElementById("summaryTrain");

    const summaryTrainNumber =
        document.getElementById("summaryTrainNumber");

    const seatCount =
        document.getElementById("seatCount");

    const seatList =
        document.getElementById("seatList");

    const passengerForms =
        document.getElementById("passengerForms");

    const summaryPassengerList =
        document.getElementById(
            "summaryPassengerList"
        );

    const mobile =
        document.getElementById("mobile");

    const email =
        document.getElementById("email");

    const idType =
        document.getElementById("idType");

    const idNumber =
        document.getElementById("idNumber");

    const mobileError =
        document.getElementById("mobileError");

    const emailError =
        document.getElementById("emailError");

    const idTypeError =
        document.getElementById("idTypeError");

    const idNumberError =
        document.getElementById("idNumberError");

    const baseFare =
        document.getElementById("baseFare");

    const convenienceFee =
        document.getElementById("convenienceFee");

    const gst =
        document.getElementById("gst");

    const totalFare =
        document.getElementById("totalFare");

    const continueBtn =
        document.getElementById("continueBtn");

    const backBtn =
        document.getElementById("backBtn");


    // =====================================================
    // LOAD BOOKING DATA
    // =====================================================

    const selectedTrain =
        JSON.parse(
            localStorage.getItem("selectedTrain")
        );


    const selectedJourney =
        JSON.parse(
            localStorage.getItem("selectedJourney")
        );


    const selectedSeats =
        JSON.parse(
            localStorage.getItem("selectedSeats")
        ) || [];


    const seatBooking =
        JSON.parse(
            localStorage.getItem("seatBooking")
        );


    // =====================================================
    // VALIDATE BOOKING
    // =====================================================

    if (
        !selectedTrain ||
        !selectedJourney ||
        !selectedSeats.length
    ) {

        navigate(
            "seat",
            app
        );

        return;

    }


    // =====================================================
    // FARE
    // =====================================================

    const base =
        Number(
            seatBooking?.baseFare
        ) ||
        (
            Number(selectedTrain.fare) *
            selectedSeats.length
        );


    const fee =
        Number(
            seatBooking?.convenienceFee
        ) || 30;


    const tax =
        Number(
            seatBooking?.gst
        ) ||
        Math.round(
            (base + fee) * 0.05
        );


    const total =
        Number(
            seatBooking?.totalFare
        ) ||
        base +
        fee +
        tax;


    // =====================================================
    // JOURNEY INFORMATION
    // =====================================================

    trainName.textContent =
        selectedTrain.name;


    trainNumber.textContent =
        `Train No. ${selectedTrain.number}`;


    fromStation.textContent =
        selectedTrain.from;


    toStation.textContent =
        selectedTrain.to;


    departureTime.textContent =
        selectedTrain.departure;


    arrivalTime.textContent =
        selectedTrain.arrival;


    journeyDuration.textContent =
        selectedTrain.duration;


    journeyDate.textContent =
        formatDisplayDate(
            selectedJourney.journeyDate
        );


    // =====================================================
    // SUMMARY
    // =====================================================

    summaryFrom.textContent =
        selectedTrain.from;


    summaryTo.textContent =
        selectedTrain.to;


    summaryTrain.textContent =
        selectedTrain.name;


    summaryTrainNumber.textContent =
        `Train No. ${selectedTrain.number}`;


    // =====================================================
    // SEATS
    // =====================================================

    seatCount.textContent =
        `${selectedSeats.length} ${
            selectedSeats.length === 1
                ? "Seat"
                : "Seats"
        }`;


    renderSeatList();

    renderPassengerForms();

    renderSummaryPassengers();


    // =====================================================
    // FARE
    // =====================================================

    baseFare.textContent =
        `₹${base}`;


    convenienceFee.textContent =
        `₹${fee}`;


    gst.textContent =
        `₹${tax}`;


    totalFare.textContent =
        `₹${total}`;


    // =====================================================
    // RESTORE SAVED PASSENGER DATA
    // =====================================================

    const savedPassengerData =
        JSON.parse(
            localStorage.getItem(
                "passengerDetails"
            )
        );


    if (savedPassengerData) {

        restorePassengerData(
            savedPassengerData
        );

    }


    // =====================================================
    // SEAT LIST
    // =====================================================

    function renderSeatList() {

        seatList.innerHTML = "";


        selectedSeats.forEach(
            (seat, index) => {

                const chip =
                    document.createElement(
                        "div"
                    );


                chip.className =
                    "passenger-seat-chip";


                chip.innerHTML = `

                    <span class="seat-number">
                        ${formatSeatName(seat)}
                    </span>

                    <span>
                        Passenger ${index + 1}
                    </span>

                `;


                seatList.appendChild(
                    chip
                );

            }
        );

    }


    // =====================================================
    // PASSENGER FORMS
    // =====================================================

    function renderPassengerForms() {

        passengerForms.innerHTML = "";


        selectedSeats.forEach(
            (seat, index) => {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "passenger-card";


                card.dataset.index =
                    index;


                card.innerHTML = `

                    <div class="passenger-card-header">

                        <div class="passenger-title">

                            <div class="passenger-number">
                                ${index + 1}
                            </div>

                            <div>

                                <h3>
                                    Passenger ${index + 1}
                                </h3>

                                <span>
                                    Enter traveller information
                                </span>

                            </div>

                        </div>


                        <span class="passenger-seat">
                            Seat ${formatSeatName(seat)}
                        </span>

                    </div>


                    <div class="form-grid">

                        <div class="form-group full-width">

                            <label>
                                Full Name
                            </label>

                            <input
                                type="text"
                                class="passenger-name"
                                data-field="name"
                                placeholder="Enter full name"
                                autocomplete="name"
                            >

                            <small
                                class="error-message"
                                data-error="name"
                            ></small>

                        </div>


                        <div class="form-group">

                            <label>
                                Age
                            </label>

                            <input
                                type="number"
                                class="passenger-age"
                                data-field="age"
                                min="1"
                                max="120"
                                placeholder="Enter age"
                            >

                            <small
                                class="error-message"
                                data-error="age"
                            ></small>

                        </div>


                        <div class="form-group">

                            <label>
                                Gender
                            </label>

                            <select
                                class="passenger-gender"
                                data-field="gender"
                            >

                                <option value="">
                                    Select gender
                                </option>

                                <option value="Male">
                                    Male
                                </option>

                                <option value="Female">
                                    Female
                                </option>

                                <option value="Other">
                                    Other
                                </option>

                            </select>

                            <small
                                class="error-message"
                                data-error="gender"
                            ></small>

                        </div>

                    </div>

                `;


                passengerForms.appendChild(
                    card
                );


                const inputs =
                    card.querySelectorAll(
                        "input, select"
                    );


                inputs.forEach(
                    input => {

                        input.addEventListener(
                            "input",
                            () => {

                                updateSummaryPassengers();

                                clearFieldError(
                                    input
                                );

                            }
                        );


                        input.addEventListener(
                            "change",
                            () => {

                                updateSummaryPassengers();

                                clearFieldError(
                                    input
                                );

                            }
                        );

                    }
                );

            }
        );

    }


    // =====================================================
    // SUMMARY PASSENGERS
    // =====================================================

    function renderSummaryPassengers() {

        summaryPassengerList.innerHTML =
            "";


        selectedSeats.forEach(
            (seat, index) => {

                const element =
                    document.createElement(
                        "div"
                    );


                element.className =
                    "summary-passenger";


                element.innerHTML = `

                    <div class="summary-passenger-left">

                        <div class="summary-passenger-avatar">
                            ${index + 1}
                        </div>

                        <div>

                            <div
                                class="summary-passenger-name"
                                data-summary-name="${index}"
                            >
                                Passenger ${index + 1}
                            </div>

                            <div
                                class="summary-passenger-gender"
                                data-summary-gender="${index}"
                            >
                                Details pending
                            </div>

                        </div>

                    </div>


                    <div
                        class="summary-passenger-seat"
                    >
                        ${formatSeatName(seat)}
                    </div>

                `;


                summaryPassengerList.appendChild(
                    element
                );

            }
        );

    }


    // =====================================================
    // UPDATE SUMMARY PASSENGERS
    // =====================================================

    function updateSummaryPassengers() {

        const cards =
            passengerForms.querySelectorAll(
                ".passenger-card"
            );


        cards.forEach(
            (card, index) => {

                const name =
                    card.querySelector(
                        ".passenger-name"
                    ).value.trim();


                const age =
                    card.querySelector(
                        ".passenger-age"
                    ).value;


                const gender =
                    card.querySelector(
                        ".passenger-gender"
                    ).value;


                const nameElement =
                    document.querySelector(
                        `[data-summary-name="${index}"]`
                    );


                const genderElement =
                    document.querySelector(
                        `[data-summary-gender="${index}"]`
                    );


                if (name) {

                    nameElement.textContent =
                        name;

                } else {

                    nameElement.textContent =
                        `Passenger ${index + 1}`;

                }


                const details = [];


                if (age) {

                    details.push(
                        `${age} yrs`
                    );

                }


                if (gender) {

                    details.push(
                        gender
                    );

                }


                genderElement.textContent =
                    details.length
                        ? details.join(" · ")
                        : "Details pending";

            }
        );

    }


    // =====================================================
    // CONTINUE
    // =====================================================

    continueBtn.addEventListener(
        "click",
        () => {

            const validation =
                validateAll();


            if (!validation.valid) {

                const firstError =
                    document.querySelector(
                        ".invalid"
                    );


                if (firstError) {

                    firstError.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                    firstError.focus();

                }


                return;

            }


            const passengers =
                collectPassengerData();


            const bookingData = {

                train:
                    selectedTrain,

                journey:
                    selectedJourney,

                seats:
                    selectedSeats,

                passengers,

                contact: {

                    mobile:
                        mobile.value.trim(),

                    email:
                        email.value.trim()

                },

                idProof: {

                    type:
                        idType.value,

                    number:
                        idNumber.value.trim()

                },

                fare: {

                    baseFare:
                        base,

                    convenienceFee:
                        fee,

                    gst:
                        tax,

                    totalFare:
                        total

                }

            };


            // SAVE

            localStorage.setItem(
                "passengerDetails",
                JSON.stringify(
                    passengers
                )
            );


            localStorage.setItem(
                "contactDetails",
                JSON.stringify({

                    mobile:
                        mobile.value.trim(),

                    email:
                        email.value.trim()

                })
            );


            localStorage.setItem(
                "idProof",
                JSON.stringify({

                    type:
                        idType.value,

                    number:
                        idNumber.value.trim()

                })
            );


            localStorage.setItem(
                "bookingData",
                JSON.stringify(
                    bookingData
                )
            );


            // NEXT PAGE

            navigate(
                "payment",
                app
            );

        }
    );


    // =====================================================
    // BACK
    // =====================================================

    backBtn.addEventListener(
        "click",
        () => {

            navigate(
                "seat",
                app
            );

        }
    );


    // =====================================================
    // VALIDATION
    // =====================================================

    function validateAll() {

        let valid = true;


        // PASSENGERS

        const cards =
            passengerForms.querySelectorAll(
                ".passenger-card"
            );


        cards.forEach(
            card => {

                const name =
                    card.querySelector(
                        ".passenger-name"
                    );


                const age =
                    card.querySelector(
                        ".passenger-age"
                    );


                const gender =
                    card.querySelector(
                        ".passenger-gender"
                    );


                if (
                    !name.value.trim()
                ) {

                    setError(
                        name,
                        "Please enter passenger name."
                    );

                    valid = false;

                }


                const ageValue =
                    Number(
                        age.value
                    );


                if (
                    !age.value ||
                    ageValue < 1 ||
                    ageValue > 120
                ) {

                    setError(
                        age,
                        "Enter a valid age."
                    );

                    valid = false;

                }


                if (
                    !gender.value
                ) {

                    setError(
                        gender,
                        "Please select gender."
                    );

                    valid = false;

                }

            }
        );


        // MOBILE

        const mobileValue =
            mobile.value.trim();


        if (
            !/^[6-9]\d{9}$/.test(
                mobileValue
            )
        ) {

            mobile.classList.add(
                "invalid"
            );

            mobileError.textContent =
                "Enter a valid 10-digit mobile number.";

            valid = false;

        } else {

            mobile.classList.remove(
                "invalid"
            );

            mobile.classList.add(
                "valid"
            );

            mobileError.textContent =
                "";

        }


        // EMAIL

        const emailValue =
            email.value.trim();


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (
            !emailPattern.test(
                emailValue
            )
        ) {

            email.classList.add(
                "invalid"
            );

            emailError.textContent =
                "Enter a valid email address.";

            valid = false;

        } else {

            email.classList.remove(
                "invalid"
            );

            email.classList.add(
                "valid"
            );

            emailError.textContent =
                "";

        }


        // ID TYPE

        if (
            !idType.value
        ) {

            idType.classList.add(
                "invalid"
            );

            idTypeError.textContent =
                "Please select an ID proof.";

            valid = false;

        } else {

            idType.classList.remove(
                "invalid"
            );

            idTypeError.textContent =
                "";

        }


        // ID NUMBER

        if (
            !idNumber.value.trim()
        ) {

            idNumber.classList.add(
                "invalid"
            );

            idNumberError.textContent =
                "Please enter ID number.";

            valid = false;

        } else {

            idNumber.classList.remove(
                "invalid"
            );

            idNumber.classList.add(
                "valid"
            );

            idNumberError.textContent =
                "";

        }


        return {
            valid
        };

    }


    // =====================================================
    // COLLECT PASSENGERS
    // =====================================================

    function collectPassengerData() {

        const cards =
            passengerForms.querySelectorAll(
                ".passenger-card"
            );


        return Array.from(
            cards
        ).map(
            (card, index) => {

                return {

                    passengerNumber:
                        index + 1,

                    seat:
                        selectedSeats[index],

                    name:
                        card
                            .querySelector(
                                ".passenger-name"
                            )
                            .value
                            .trim(),

                    age:
                        Number(
                            card
                                .querySelector(
                                    ".passenger-age"
                                )
                                .value
                        ),

                    gender:
                        card
                            .querySelector(
                                ".passenger-gender"
                            )
                            .value

                };

            }
        );

    }


    // =====================================================
    // RESTORE
    // =====================================================

    function restorePassengerData(
        savedData
    ) {

        if (
            !Array.isArray(
                savedData
            )
        ) {

            return;

        }


        const cards =
            passengerForms.querySelectorAll(
                ".passenger-card"
            );


        savedData.forEach(
            (data, index) => {

                const card =
                    cards[index];


                if (!card) {

                    return;

                }


                card.querySelector(
                    ".passenger-name"
                ).value =
                    data.name || "";


                card.querySelector(
                    ".passenger-age"
                ).value =
                    data.age || "";


                card.querySelector(
                    ".passenger-gender"
                ).value =
                    data.gender || "";

            }
        );


        const savedContact =
            JSON.parse(
                localStorage.getItem(
                    "contactDetails"
                )
            );


        if (savedContact) {

            mobile.value =
                savedContact.mobile || "";

            email.value =
                savedContact.email || "";

        }


        const savedId =
            JSON.parse(
                localStorage.getItem(
                    "idProof"
                )
            );


        if (savedId) {

            idType.value =
                savedId.type || "";

            idNumber.value =
                savedId.number || "";

        }


        updateSummaryPassengers();

    }


    // =====================================================
    // ERROR HELPERS
    // =====================================================

    function setError(
        input,
        message
    ) {

        input.classList.add(
            "invalid"
        );


        const card =
            input.closest(
                ".passenger-card"
            );


        if (card) {

            const error =
                card.querySelector(
                    `[data-error="${input.dataset.field}"]`
                );


            if (error) {

                error.textContent =
                    message;

            }

        }

    }


    function clearFieldError(
        input
    ) {

        input.classList.remove(
            "invalid"
        );


        const card =
            input.closest(
                ".passenger-card"
            );


        if (card) {

            const error =
                card.querySelector(
                    `[data-error="${input.dataset.field}"]`
                );


            if (error) {

                error.textContent =
                    "";

            }

        }

    }


    // =====================================================
    // SEAT NAME
    // =====================================================

    function formatSeatName(
        seat
    ) {

        if (!seat) {

            return "";

        }


        const parts =
            seat.split("-");


        return parts.length > 1
            ? parts[1]
            : seat;

    }


    // =====================================================
    // DATE
    // =====================================================

    function formatDisplayDate(
        value
    ) {

        if (!value) {

            return "Today";

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
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }

}