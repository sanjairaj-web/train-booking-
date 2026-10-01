import "./seat.css";

import seatHTML from "./seat.html";

import { navigate } from "../router.js";


// =========================================================
// CONFIG
// =========================================================

const MAX_SEATS = 4;

const CONVENIENCE_FEE = 30;

const GST_RATE = 0.05;


// =========================================================
// SHOW SEAT PAGE
// =========================================================

export function showSeat(app) {

    app.innerHTML = seatHTML;


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

    const maxPassengers =
        document.getElementById("maxPassengers");

    const coachList =
        document.getElementById("coachList");

    const activeCoach =
        document.getElementById("activeCoach");

    const seatMap =
        document.getElementById("seatMap");

    const selectedCount =
        document.getElementById("selectedCount");

    const selectedSeatsContainer =
        document.getElementById("selectedSeats");

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

    const timerElement =
        document.getElementById("timer");


    // =====================================================
    // LOAD DATA
    // =====================================================

    const selectedTrain =
        JSON.parse(
            localStorage.getItem("selectedTrain")
        );


    const selectedJourney =
        JSON.parse(
            localStorage.getItem("selectedJourney")
        );


    if (!selectedTrain) {

        navigate(
            "search",
            app
        );

        return;

    }


    // =====================================================
    // JOURNEY DATA
    // =====================================================

    const journey =
        selectedJourney || {};


    const passengerLimit =
        Number(
            journey.passengers
        ) || MAX_SEATS;


    maxPassengers.textContent =
        passengerLimit;


    // =====================================================
    // TRAIN INFORMATION
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


    summaryFrom.textContent =
        selectedTrain.from;


    summaryTo.textContent =
        selectedTrain.to;


    journeyDate.textContent =
        formatDisplayDate(
            journey.journeyDate
        );


    // =====================================================
    // STATE
    // =====================================================

    let currentCoach = "S1";

    let selectedSeats = [];

    let timerSeconds = 300;


    // =====================================================
    // COACHES
    // =====================================================

    const coaches = [
        "S1",
        "S2",
        "S3",
        "S4"
    ];


    renderCoaches();

    renderSeats();

    updateSummary();


    // =====================================================
    // RENDER COACHES
    // =====================================================

    function renderCoaches() {

        coachList.innerHTML = "";


        coaches.forEach(
            coach => {

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "coach-btn";


                if (
                    coach ===
                    currentCoach
                ) {

                    button.classList.add(
                        "active"
                    );

                }


                button.textContent =
                    coach;


                button.addEventListener(
                    "click",
                    () => {

                        currentCoach =
                            coach;


                        activeCoach.textContent =
                            coach;


                        renderCoaches();

                        renderSeats();

                    }
                );


                coachList.appendChild(
                    button
                );

            }
        );

    }


    // =====================================================
    // RENDER SEATS
    // =====================================================

    function renderSeats() {

        seatMap.innerHTML = "";


        const occupiedSeats =
            getOccupiedSeats(
                currentCoach
            );


        const heldSeats =
            getHeldSeats(
                currentCoach
            );


        for (
            let row = 1;
            row <= 12;
            row++
        ) {

            const rowElement =
                document.createElement(
                    "div"
                );


            rowElement.className =
                "seat-row";


            const rowNumber =
                document.createElement(
                    "span"
                );


            rowNumber.className =
                "row-number";


            rowNumber.textContent =
                row;


            rowElement.appendChild(
                rowNumber
            );


            // A1

            addSeat(
                rowElement,
                `${currentCoach}-${row}A`,
                occupiedSeats,
                heldSeats
            );


            // A2

            addSeat(
                rowElement,
                `${currentCoach}-${row}B`,
                occupiedSeats,
                heldSeats
            );


            // AISLE

            const aisle =
                document.createElement(
                    "div"
                );


            aisle.className =
                "aisle";


            rowElement.appendChild(
                aisle
            );


            // A3

            addSeat(
                rowElement,
                `${currentCoach}-${row}C`,
                occupiedSeats,
                heldSeats
            );


            seatMap.appendChild(
                rowElement
            );

        }

    }


    // =====================================================
    // ADD SEAT
    // =====================================================

    function addSeat(
        rowElement,
        seatId,
        occupiedSeats,
        heldSeats
    ) {

        const seat =
            document.createElement(
                "button"
            );


        seat.type =
            "button";


        seat.className =
            "seat";


        const shortName =
            seatId.split("-")[1];


        seat.textContent =
            shortName;


        // OCCUPIED

        if (
            occupiedSeats.includes(
                seatId
            )
        ) {

            seat.classList.add(
                "occupied"
            );


            seat.disabled =
                true;

        }


        // HELD

        else if (
            heldSeats.includes(
                seatId
            )
        ) {

            seat.classList.add(
                "held"
            );


            seat.disabled =
                true;

        }


        // SELECTED

        else if (
            selectedSeats.includes(
                seatId
            )
        ) {

            seat.classList.add(
                "selected"
            );

        }


        seat.addEventListener(
            "click",
            () => {

                toggleSeat(
                    seatId
                );

            }
        );


        rowElement.appendChild(
            seat
        );

    }


    // =====================================================
    // TOGGLE SEAT
    // =====================================================

    function toggleSeat(
        seatId
    ) {

        const index =
            selectedSeats.indexOf(
                seatId
            );


        // REMOVE

        if (
            index !== -1
        ) {

            selectedSeats.splice(
                index,
                1
            );

        }


        // ADD

        else {

            if (
                selectedSeats.length >=
                passengerLimit
            ) {

                alert(
                    `You can select maximum ${passengerLimit} seats.`
                );

                return;

            }


            selectedSeats.push(
                seatId
            );

        }


        renderSeats();

        updateSummary();

    }


    // =====================================================
    // UPDATE SUMMARY
    // =====================================================

    function updateSummary() {

        const count =
            selectedSeats.length;


        selectedCount.textContent =
            `${count} ${
                count === 1
                    ? "seat"
                    : "seats"
            }`;


        selectedSeatsContainer.innerHTML =
            "";


        if (
            count === 0
        ) {

            selectedSeatsContainer.innerHTML = `

                <div class="no-seat">
                    No seats selected
                </div>

            `;

        }


        selectedSeats.forEach(
            seat => {

                const element =
                    document.createElement(
                        "span"
                    );


                element.className =
                    "selected-seat";


                element.textContent =
                    seat;


                selectedSeatsContainer.appendChild(
                    element
                );

            }
        );


        // =================================================
        // FARE
        // =================================================

        const fare =
            Number(
                selectedTrain.fare
            ) || 0;


        const base =
            fare *
            count;


        const fee =
            count > 0
                ? CONVENIENCE_FEE
                : 0;


        const tax =
            Math.round(
                (base + fee) *
                GST_RATE
            );


        const total =
            base +
            fee +
            tax;


        baseFare.textContent =
            `₹${base}`;


        convenienceFee.textContent =
            `₹${fee}`;


        gst.textContent =
            `₹${tax}`;


        totalFare.textContent =
            `₹${total}`;


        // =================================================
        // BUTTON
        // =================================================

        continueBtn.disabled =
            count === 0;

    }


    // =====================================================
    // CONTINUE
    // =====================================================

    continueBtn.addEventListener(
        "click",
        () => {

            if (
                selectedSeats.length === 0
            ) {

                return;

            }


            const fare =
                Number(
                    selectedTrain.fare
                ) || 0;


            const base =
                fare *
                selectedSeats.length;


            const fee =
                CONVENIENCE_FEE;


            const tax =
                Math.round(
                    (base + fee) *
                    GST_RATE
                );


            const total =
                base +
                fee +
                tax;


            // Save selected seats

            localStorage.setItem(
                "selectedSeats",
                JSON.stringify(
                    selectedSeats
                )
            );


            localStorage.setItem(
                "seat",
                JSON.stringify(
                    selectedSeats
                )
            );


            localStorage.setItem(
                "totalFare",
                String(total)
            );


            localStorage.setItem(
                "seatBooking",
                JSON.stringify({

                    train:
                        selectedTrain,

                    journey:
                        selectedJourney,

                    seats:
                        selectedSeats,

                    baseFare:
                        base,

                    convenienceFee:
                        fee,

                    gst:
                        tax,

                    totalFare:
                        total,

                    coach:
                        currentCoach

                })
            );


            navigate(
                "passenger",
                app
            );

        }
    );


    // =====================================================
    // TIMER
    // =====================================================

    const timer =
        setInterval(
            () => {

                timerSeconds--;


                if (
                    timerSeconds <= 0
                ) {

                    clearInterval(
                        timer
                    );


                    timerElement.textContent =
                        "00:00";


                    continueBtn.disabled =
                        true;


                    alert(
                        "Your seat hold has expired."
                    );


                    return;

                }


                const minutes =
                    Math.floor(
                        timerSeconds / 60
                    );


                const seconds =
                    timerSeconds % 60;


                timerElement.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

            },
            1000
        );


    // =====================================================
    // OCCUPIED SEATS
    // =====================================================

    function getOccupiedSeats(
        coach
    ) {

        const occupied = {

            S1: [
                "S1-1A",
                "S1-2B",
                "S1-4C",
                "S1-6A",
                "S1-8B",
                "S1-10C"
            ],

            S2: [
                "S2-2A",
                "S2-3C",
                "S2-5B",
                "S2-7A",
                "S2-9C"
            ],

            S3: [
                "S3-1B",
                "S3-4A",
                "S3-6C",
                "S3-8B",
                "S3-11A"
            ],

            S4: [
                "S4-2C",
                "S4-5A",
                "S4-7B",
                "S4-9C",
                "S4-12A"
            ]

        };


        return occupied[coach] || [];

    }


    // =====================================================
    // HELD SEATS
    // =====================================================

    function getHeldSeats(
        coach
    ) {

        const held = {

            S1: [
                "S1-3A",
                "S1-7C"
            ],

            S2: [
                "S2-4B",
                "S2-10A"
            ],

            S3: [
                "S3-3C",
                "S3-9B"
            ],

            S4: [
                "S4-1A",
                "S4-8C"
            ]

        };


        return held[coach] || [];

    }


    // =====================================================
    // DATE FORMAT
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