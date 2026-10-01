import "./seat.css";
import seatHTML from "./seat.html";

import { navigate } from "../router.js";


const MAX_SEATS = 4;

const BASE_FARE = 550;

const CONVENIENCE_FEE = 20;

const GST_RATE = 0.05;


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
        document.getElementById(
            "journeyDuration"
        );

    const journeyDate =
        document.getElementById("journeyDate");

    const summaryFrom =
        document.getElementById("summaryFrom");

    const summaryTo =
        document.getElementById("summaryTo");

    const coachList =
        document.getElementById("coachList");

    const activeCoach =
        document.getElementById("activeCoach");

    const seatMap =
        document.getElementById("seatMap");

    const selectedSeatsContainer =
        document.getElementById(
            "selectedSeats"
        );

    const selectedCount =
        document.getElementById(
            "selectedCount"
        );

    const baseFare =
        document.getElementById("baseFare");

    const convenienceFee =
        document.getElementById(
            "convenienceFee"
        );

    const gst =
        document.getElementById("gst");

    const totalFare =
        document.getElementById(
            "totalFare"
        );

    const continueBtn =
        document.getElementById(
            "continueBtn"
        );

    const maxPassengers =
        document.getElementById(
            "maxPassengers"
        );

    const timerElement =
        document.getElementById("timer");


    // =====================================================
    // GET TRAIN
    // =====================================================

    const selectedTrain =
        JSON.parse(
            localStorage.getItem(
                "selectedTrain"
            )
        );


    const selectedJourney =
        JSON.parse(
            localStorage.getItem(
                "selectedJourney"
            )
        );


    if (!selectedTrain) {

        alert(
            "Please select a train first."
        );

        navigate(
            "search",
            app
        );

        return;

    }


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


    if (selectedJourney) {

        journeyDate.textContent =
            formatDate(
                selectedJourney.journeyDate
            );


        maxPassengers.textContent =
            selectedJourney.passengers || MAX_SEATS;

    }


    // =====================================================
    // COACHES
    // =====================================================

    const coaches = [

        {
            id: "coach-s1",
            number: "S1",
            classType: "SLEEPER"
        },

        {
            id: "coach-s2",
            number: "S2",
            classType: "SLEEPER"
        },

        {
            id: "coach-s3",
            number: "S3",
            classType: "SLEEPER"
        },

        {
            id: "coach-s4",
            number: "S4",
            classType: "SLEEPER"
        }

    ];


    let currentCoach =
        coaches[0];


    let selectedSeats = [];


    // =====================================================
    // RENDER COACH BUTTONS
    // =====================================================

    coaches.forEach(
        coach => {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "coach-btn";


            button.textContent =
                coach.number;


            if (
                coach.id ===
                currentCoach.id
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    currentCoach =
                        coach;


                    document
                        .querySelectorAll(
                            ".coach-btn"
                        )
                        .forEach(
                            btn =>
                                btn.classList.remove(
                                    "active"
                                )
                        );


                    button.classList.add(
                        "active"
                    );


                    renderSeatMap();

                }
            );


            coachList.appendChild(
                button
            );

        }
    );


    // =====================================================
    // SEAT DATA
    // =====================================================

    function createSeats() {

        const seats = [];


        for (
            let number = 1;
            number <= 40;
            number++
        ) {

            let berthType;


            const position =
                (number - 1) % 8;


            if (
                position === 0 ||
                position === 3
            ) {

                berthType =
                    "LOWER";

            } else if (
                position === 1 ||
                position === 4
            ) {

                berthType =
                    "MIDDLE";

            } else if (
                position === 2 ||
                position === 5
            ) {

                berthType =
                    "UPPER";

            } else if (
                position === 6
            ) {

                berthType =
                    "SIDE_LOWER";

            } else {

                berthType =
                    "SIDE_UPPER";

            }


            seats.push({

                id:
                    crypto.randomUUID(),

                coach_id:
                    currentCoach.id,

                seat_number:
                    number,

                berth_type:
                    berthType,

                status:
                    getRandomStatus(
                        number
                    )

            });

        }


        return seats;

    }


    // =====================================================
    // MOCK OCCUPIED / HELD
    // =====================================================

    function getRandomStatus(
        number
    ) {

        /*
         * In production this comes from:
         *
         * GET
         * /api/v1/trains/:id/coaches
         *
         * Here we simulate the database.
         */

        if (
            [4, 8, 13, 19, 27, 35]
                .includes(number)
        ) {

            return "BOOKED";

        }


        if (
            [10, 22, 31]
                .includes(number)
        ) {

            return "HELD";

        }


        return "AVAILABLE";

    }


    // =====================================================
    // RENDER SEAT MAP
    // =====================================================

    function renderSeatMap() {

        seatMap.innerHTML = "";


        activeCoach.textContent =
            currentCoach.number;


        const seats =
            createSeats();


        /*
         * 40 seats
         *
         * 4 rows × 10 seats
         */

        for (
            let row = 0;
            row < 10;
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
                row + 1;


            rowElement.appendChild(
                rowNumber
            );


            const rowSeats =
                seats.slice(
                    row * 4,
                    row * 4 + 4
                );


            rowSeats.forEach(
                (seat, index) => {

                    if (index === 2) {

                        const aisle =
                            document.createElement(
                                "div"
                            );


                        aisle.className =
                            "aisle";


                        rowElement.appendChild(
                            aisle
                        );

                    }


                    const seatElement =
                        document.createElement(
                            "button"
                        );


                    seatElement.className =
                        "seat";


                    seatElement.textContent =
                        seat.seat_number;


                    seatElement.dataset.id =
                        seat.id;


                    seatElement.dataset.number =
                        seat.seat_number;


                    seatElement.dataset.berth =
                        seat.berth_type;


                    seatElement.dataset.status =
                        seat.status;


                    applySeatStatus(
                        seatElement,
                        seat
                    );


                    if (
                        seat.status ===
                        "AVAILABLE"
                    ) {

                        seatElement.addEventListener(
                            "click",
                            () => {

                                toggleSeat(
                                    seat,
                                    seatElement
                                );

                            }
                        );

                    }


                    rowElement.appendChild(
                        seatElement
                    );

                }
            );


            seatMap.appendChild(
                rowElement
            );

        }

    }


    // =====================================================
    // APPLY STATUS
    // =====================================================

    function applySeatStatus(
        element,
        seat
    ) {

        element.classList.add(
            seat.status.toLowerCase()
        );


        if (
            seat.status ===
            "BOOKED"
        ) {

            element.disabled = true;

            element.title =
                `${seat.seat_number} - Booked`;

        }


        if (
            seat.status ===
            "HELD"
        ) {

            element.disabled = true;

            element.title =
                `${seat.seat_number} - Temporarily held`;

        }

    }


    // =====================================================
    // SELECT / DESELECT
    // =====================================================

    function toggleSeat(
        seat,
        element
    ) {

        const existingIndex =
            selectedSeats.findIndex(
                item =>
                    item.id === seat.id
            );


        // DESELECT

        if (
            existingIndex !== -1
        ) {

            selectedSeats.splice(
                existingIndex,
                1
            );


            element.classList.remove(
                "selected"
            );


            updateSummary();

            return;

        }


        // MAX LIMIT

        const maxAllowed =
            selectedJourney?.passengers ||
            MAX_SEATS;


        if (
            selectedSeats.length >=
            maxAllowed
        ) {

            alert(
                `You can select maximum ${maxAllowed} seats.`
            );

            return;

        }


        // SELECT

        selectedSeats.push({

            ...seat,

            coach_number:
                currentCoach.number

        });


        element.classList.add(
            "selected"
        );


        updateSummary();

    }


    // =====================================================
    // SUMMARY
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


        if (!count) {

            selectedSeatsContainer.innerHTML =
                `
                <div class="no-seat">
                    No seats selected
                </div>
                `;

            continueBtn.disabled =
                true;

        } else {

            selectedSeats.forEach(
                seat => {

                    const chip =
                        document.createElement(
                            "span"
                        );


                    chip.className =
                        "selected-seat";


                    chip.textContent =
                        `${seat.coach_number} - ${seat.seat_number}`;


                    chip.title =
                        seat.berth_type;


                    selectedSeatsContainer
                        .appendChild(
                            chip
                        );

                }
            );


            continueBtn.disabled =
                false;

        }


        // =================================================
        // FARE
        // =================================================

        const farePerSeat =
            selectedTrain.fare ||
            BASE_FARE;


        const base =
            farePerSeat * count;


        const convenience =
            count > 0
                ? CONVENIENCE_FEE
                : 0;


        const taxable =
            base +
            convenience;


        const gstAmount =
            taxable *
            GST_RATE;


        const total =
            taxable +
            gstAmount;


        baseFare.textContent =
            formatCurrency(base);


        convenienceFee.textContent =
            formatCurrency(
                convenience
            );


        gst.textContent =
            formatCurrency(
                gstAmount
            );


        totalFare.textContent =
            formatCurrency(
                total
            );


        // Save current selection

        localStorage.setItem(
            "selectedSeats",
            JSON.stringify(
                selectedSeats
            )
        );


        localStorage.setItem(
            "totalFare",
            total.toFixed(2)
        );

    }


    // =====================================================
    // CONTINUE
    // =====================================================

    continueBtn.addEventListener(
        "click",
        () => {

            if (
                !selectedSeats.length
            ) {

                return;

            }


            /*
             * In production:
             *
             * POST
             * /api/v1/seats/hold
             *
             * The backend should create a
             * temporary HELD reservation.
             */


            localStorage.setItem(
                "heldSeats",
                JSON.stringify(
                    selectedSeats
                )
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

    let remainingSeconds =
        5 * 60;


    const timer =
        setInterval(
            () => {

                remainingSeconds--;


                if (
                    remainingSeconds <= 0
                ) {

                    clearInterval(
                        timer
                    );


                    timerElement.textContent =
                        "00:00";


                    alert(
                        "Your seat hold has expired."
                    );


                    localStorage.removeItem(
                        "selectedSeats"
                    );


                    location.reload();


                    return;

                }


                const minutes =
                    Math.floor(
                        remainingSeconds /
                        60
                    );


                const seconds =
                    remainingSeconds %
                    60;


                timerElement.textContent =
                    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


            },
            1000
        );


    // =====================================================
    // INITIAL RENDER
    // =====================================================

    renderSeatMap();


    // =====================================================
    // HELPERS
    // =====================================================

    function formatCurrency(
        amount
    ) {

        return (
            "₹" +
            Math.round(amount)
        );

    }


    function formatDate(
        value
    ) {

        if (!value) {

            return "Not selected";

        }


        const date =
            new Date(
                `${value}T00:00:00`
            );


        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }

}