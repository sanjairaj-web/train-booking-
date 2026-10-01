import "./search.css";
import searchHTML from "./search.html";

import { navigate } from "../router.js";


export function showSearch(app) {

    app.innerHTML = searchHTML;


    // =====================================================
    // ELEMENTS
    // =====================================================

    const fromStation =
        document.getElementById("fromStation");

    const toStation =
        document.getElementById("toStation");

    const journeyDate =
        document.getElementById("journeyDate");

    const returnDate =
        document.getElementById("returnDate");

    const returnField =
        document.getElementById("returnField");

    const passengers =
        document.getElementById("passengers");

    const travelClass =
        document.getElementById("travelClass");

    const searchBtn =
        document.getElementById("searchBtn");

    const swapBtn =
        document.getElementById("swapBtn");

    const trainResults =
        document.getElementById("trainResults");

    const resultsHeader =
        document.getElementById("resultsHeader");

    const trainCount =
        document.getElementById("trainCount");

    const resultsTitle =
        document.getElementById("resultsTitle");

    const resultsSubtitle =
        document.getElementById("resultsSubtitle");

    const userName =
        document.getElementById("userName");

    const logoutBtn =
        document.getElementById("logoutBtn");

    const detailsModal =
        document.getElementById("detailsModal");

    const modalContent =
        document.getElementById("modalContent");

    const closeModal =
        document.getElementById("closeModal");


    // =====================================================
    // USER
    // =====================================================

    const savedUser =
        localStorage.getItem("userName");


    if (savedUser) {

        userName.textContent =
            savedUser;

    }


    // =====================================================
    // DATE
    // =====================================================

    const today =
        new Date();


    const todayString =
        formatDate(today);


    journeyDate.min =
        todayString;


    journeyDate.value =
        todayString;


    returnDate.min =
        todayString;


    // =====================================================
    // TRIP TYPE
    // =====================================================

    let tripType = "oneway";


    document
        .querySelectorAll(".trip-tab")
        .forEach(tab => {

            tab.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(".trip-tab")
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    tab.classList.add(
                        "active"
                    );


                    tripType =
                        tab.dataset.trip;


                    if (
                        tripType ===
                        "roundtrip"
                    ) {

                        returnField.classList.remove(
                            "hidden"
                        );

                    } else {

                        returnField.classList.add(
                            "hidden"
                        );

                    }

                }
            );

        });


    // =====================================================
    // SWAP
    // =====================================================

    swapBtn.addEventListener(
        "click",
        () => {

            const temp =
                fromStation.value;


            fromStation.value =
                toStation.value;


            toStation.value =
                temp;

        }
    );


    // =====================================================
    // QUICK DATES
    // =====================================================

    document
        .querySelectorAll(
            ".quick-dates button"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.date;


                    const date =
                        new Date();


                    if (
                        type ===
                        "tomorrow"
                    ) {

                        date.setDate(
                            date.getDate() + 1
                        );

                    }


                    if (
                        type ===
                        "2days"
                    ) {

                        date.setDate(
                            date.getDate() + 2
                        );

                    }


                    if (
                        type ===
                        "3days"
                    ) {

                        date.setDate(
                            date.getDate() + 3
                        );

                    }


                    journeyDate.value =
                        formatDate(date);


                    // Round trip return

                    if (
                        tripType ===
                        "roundtrip"
                    ) {

                        const returnTrip =
                            new Date(date);


                        returnTrip.setDate(
                            returnTrip.getDate() + 2
                        );


                        returnDate.value =
                            formatDate(
                                returnTrip
                            );

                    }

                }
            );

        });


    // =====================================================
    // SEARCH
    // =====================================================

    searchBtn.addEventListener(
        "click",
        () => {

            const from =
                fromStation.value;

            const to =
                toStation.value;


            const date =
                journeyDate.value;


            const passengerCount =
                Number(
                    passengers.value
                );


            const selectedClass =
                travelClass.value;


            // Same station

            if (from === to) {

                alert(
                    "Departure and destination cannot be the same."
                );

                return;

            }


            // Round trip validation

            if (
                tripType ===
                "roundtrip" &&
                !returnDate.value
            ) {

                alert(
                    "Please select a return date."
                );

                return;

            }


            // Save journey

            localStorage.setItem(
                "selectedJourney",
                JSON.stringify({

                    from,

                    to,

                    journeyDate: date,

                    returnDate:
                        returnDate.value,

                    tripType,

                    passengers:
                        passengerCount,

                    travelClass:
                        selectedClass

                })
            );


            // Generate trains

            const results =
                getTrains(
                    from,
                    to
                );


            renderTrains(
                results
            );

        }
    );


    // =====================================================
    // GET TRAINS
    // =====================================================

    function getTrains(
        from,
        to
    ) {

        const allTrains = [

            {
                name:
                    "Kovai Express",

                number:
                    "12675",

                from:
                    "Chennai",

                to:
                    "Coimbatore",

                departure:
                    "06:10 AM",

                arrival:
                    "02:00 PM",

                duration:
                    "7h 50m",

                type:
                    "Express",

                fare:
                    550
            },


            {
                name:
                    "Intercity Express",

                number:
                    "12679",

                from:
                    "Chennai",

                to:
                    "Coimbatore",

                departure:
                    "02:30 PM",

                arrival:
                    "09:45 PM",

                duration:
                    "7h 15m",

                type:
                    "Intercity",

                fare:
                    480
            },


            {
                name:
                    "Cheran Express",

                number:
                    "12673",

                from:
                    "Chennai",

                to:
                    "Coimbatore",

                departure:
                    "10:15 PM",

                arrival:
                    "06:30 AM",

                duration:
                    "8h 15m",

                type:
                    "Superfast",

                fare:
                    620
            },


            {
                name:
                    "Pandian Express",

                number:
                    "12637",

                from:
                    "Chennai",

                to:
                    "Madurai",

                departure:
                    "09:40 PM",

                arrival:
                    "06:00 AM",

                duration:
                    "8h 20m",

                type:
                    "Superfast",

                fare:
                    590
            },


            {
                name:
                    "Vaigai Express",

                number:
                    "12635",

                from:
                    "Chennai",

                to:
                    "Madurai",

                departure:
                    "07:00 AM",

                arrival:
                    "02:45 PM",

                duration:
                    "7h 45m",

                type:
                    "Express",

                fare:
                    520
            },


            {
                name:
                    "Bangalore Express",

                number:
                    "12609",

                from:
                    "Chennai",

                to:
                    "Bangalore",

                departure:
                    "07:50 AM",

                arrival:
                    "01:00 PM",

                duration:
                    "5h 10m",

                type:
                    "Express",

                fare:
                    450
            },


            {
                name:
                    "Brindavan Express",

                number:
                    "12639",

                from:
                    "Chennai",

                to:
                    "Bangalore",

                departure:
                    "03:30 PM",

                arrival:
                    "09:10 PM",

                duration:
                    "5h 40m",

                type:
                    "Express",

                fare:
                    490
            },


            {
                name:
                    "Salem Express",

                number:
                    "16087",

                from:
                    "Chennai",

                to:
                    "Salem",

                departure:
                    "08:30 AM",

                arrival:
                    "02:15 PM",

                duration:
                    "5h 45m",

                type:
                    "Express",

                fare:
                    390
            }

        ];


        return allTrains.filter(
            train =>
                train.from === from &&
                train.to === to
        );

    }


    // =====================================================
    // RENDER TRAINS
    // =====================================================

    function renderTrains(
        trains
    ) {

        trainResults.innerHTML = "";


        resultsHeader.classList.remove(
            "hidden"
        );


        trainCount.textContent =
            trains.length;


        resultsTitle.textContent =
            `${fromStation.value} → ${toStation.value}`;


        resultsSubtitle.textContent =
            `Available trains for ${
                formatDisplayDate(
                    journeyDate.value
                )
            }`;


        if (!trains.length) {

            trainResults.innerHTML = `

                <div class="empty-results">

                    <div class="empty-icon">
                        🚆
                    </div>

                    <h3>
                        No trains found
                    </h3>

                    <p>
                        Try another route or travel date.
                    </p>

                </div>

            `;

            return;

        }


        trains.forEach(train => {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "train-card";


            card.innerHTML = `

                <div class="train-top">

                    <div>

                        <div class="train-name">
                            🚆 ${train.name}
                        </div>

                        <div class="train-number">
                            Train No. ${train.number}
                        </div>

                    </div>

                    <span class="availability">
                        ● Available
                    </span>

                </div>


                <div class="journey-row">

                    <div class="time-block">

                        <strong>
                            ${train.departure}
                        </strong>

                        <span>
                            ${train.from}
                        </span>

                    </div>


                    <div class="duration-block">

                        <span>
                            ${train.duration}
                        </span>

                        <div class="journey-line">
                            ─────────────
                        </div>

                        <small>
                            ${train.type}
                        </small>

                    </div>


                    <div class="time-block">

                        <strong>
                            ${train.arrival}
                        </strong>

                        <span>
                            ${train.to}
                        </span>

                    </div>

                </div>


                <div class="train-bottom">

                    <div class="fare-block">

                        <span>
                            Starting from
                        </span>

                        <strong>
                            ₹${train.fare}
                        </strong>

                        <small>
                            / passenger
                        </small>

                    </div>


                    <div class="train-actions">

                        <button
                            class="details-btn"
                        >
                            View Details
                        </button>

                        <button
                            class="select-train-btn"
                        >
                            Select Train
                            →
                        </button>

                    </div>

                </div>

            `;


            // View details

            card
                .querySelector(
                    ".details-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        showDetails(
                            train
                        );

                    }
                );


            // Select train

            card
                .querySelector(
                    ".select-train-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        selectTrain(
                            train
                        );

                    }
                );


            trainResults.appendChild(
                card
            );

        });

    }


    // =====================================================
    // SELECT TRAIN
    // =====================================================

    function selectTrain(
        train
    ) {

        localStorage.setItem(
            "selectedTrain",
            JSON.stringify(train)
        );


        navigate(
            "seat",
            app
        );

    }


    // =====================================================
    // DETAILS
    // =====================================================

    function showDetails(
        train
    ) {

        modalContent.innerHTML = `

            <span class="modal-label">
                TRAIN DETAILS
            </span>

            <h2 class="modal-title">
                🚆 ${train.name}
            </h2>

            <span class="modal-number">
                Train No. ${train.number}
            </span>


            <div class="modal-route">

                <div class="modal-station">

                    <strong>
                        ${train.departure}
                    </strong>

                    <span>
                        ${train.from}
                    </span>

                </div>


                <div class="modal-middle">

                    ${train.duration}

                    <div class="modal-line">
                        ● ───────── ●
                    </div>

                    ${train.type}

                </div>


                <div class="modal-station">

                    <strong>
                        ${train.arrival}
                    </strong>

                    <span>
                        ${train.to}
                    </span>

                </div>

            </div>


            <div class="modal-details">

                <div class="modal-detail">

                    <span>
                        Journey
                    </span>

                    <strong>
                        ${train.duration}
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Train Type
                    </span>

                    <strong>
                        ${train.type}
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Starting Fare
                    </span>

                    <strong>
                        ₹${train.fare}
                    </strong>

                </div>


                <div class="modal-detail">

                    <span>
                        Availability
                    </span>

                    <strong>
                        Available
                    </strong>

                </div>

            </div>


            <div class="modal-classes">

                <h3>
                    Available Classes
                </h3>

                <div class="class-list">

                    <span class="class-chip">
                        SL · Sleeper
                    </span>

                    <span class="class-chip">
                        3A · AC 3 Tier
                    </span>

                    <span class="class-chip">
                        2A · AC 2 Tier
                    </span>

                    <span class="class-chip">
                        1A · First AC
                    </span>

                </div>

            </div>


            <div class="modal-footer">

                <div class="modal-fare">

                    <span>
                        Starting from
                    </span>

                    <strong>
                        ₹${train.fare}
                    </strong>

                </div>


                <button
                    class="modal-select"
                    id="modalSelectBtn"
                >
                    Select Train →
                </button>

            </div>

        `;


        detailsModal.classList.remove(
            "hidden"
        );


        document
            .getElementById(
                "modalSelectBtn"
            )
            .addEventListener(
                "click",
                () => {

                    detailsModal.classList.add(
                        "hidden"
                    );


                    selectTrain(
                        train
                    );

                }
            );

    }


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    closeModal.addEventListener(
        "click",
        () => {

            detailsModal.classList.add(
                "hidden"
            );

        }
    );


    detailsModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                detailsModal
            ) {

                detailsModal.classList.add(
                    "hidden"
                );

            }

        }
    );


    // =====================================================
    // LOGOUT
    // =====================================================

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "userName"
            );

            localStorage.removeItem(
                "selectedTrain"
            );

            localStorage.removeItem(
                "selectedJourney"
            );

            navigate(
                "login",
                app
            );

        }
    );


    // =====================================================
    // HELPERS
    // =====================================================

    function formatDate(
        date
    ) {

        const year =
            date.getFullYear();

        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );


        return `${year}-${month}-${day}`;

    }


    function formatDisplayDate(
        value
    ) {

        if (!value) {

            return "";

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