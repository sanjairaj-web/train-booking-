
import "./payment.css";
import paymentHTML from "./payment.html";

import { navigate } from "../router.js";


export function showPayment(app) {

    app.innerHTML = paymentHTML;


    // =====================================================
    // ELEMENTS
    // =====================================================

    const paymentMethods =
        document.querySelectorAll(
            ".payment-method"
        );


    const upiForm =
        document.getElementById(
            "upiForm"
        );


    const cardForm =
        document.getElementById(
            "cardForm"
        );


    const netbankingForm =
        document.getElementById(
            "netbankingForm"
        );


    const walletForm =
        document.getElementById(
            "walletForm"
        );


    const upiId =
        document.getElementById(
            "upiId"
        );


    const verifyUpiBtn =
        document.getElementById(
            "verifyUpiBtn"
        );


    const upiMessage =
        document.getElementById(
            "upiMessage"
        );


    const cardNumber =
        document.getElementById(
            "cardNumber"
        );


    const cardName =
        document.getElementById(
            "cardName"
        );


    const cardExpiry =
        document.getElementById(
            "cardExpiry"
        );


    const cardCvv =
        document.getElementById(
            "cardCvv"
        );


    const cardPreviewNumber =
        document.getElementById(
            "cardPreviewNumber"
        );


    const cardPreviewName =
        document.getElementById(
            "cardPreviewName"
        );


    const cardPreviewExpiry =
        document.getElementById(
            "cardPreviewExpiry"
        );


    const bankSelect =
        document.getElementById(
            "bankSelect"
        );


    const walletOptions =
        document.querySelectorAll(
            ".wallet-option"
        );


    const payBtn =
        document.getElementById(
            "payBtn"
        );


    const payAmount =
        document.getElementById(
            "payAmount"
        );


    const processingModal =
        document.getElementById(
            "processingModal"
        );


    // =====================================================
    // LOAD BOOKING DATA
    // =====================================================

    const selectedTrain =
        JSON.parse(
            localStorage.getItem(
                "selectedTrain"
            ) || "null"
        );


    const selectedJourney =
        JSON.parse(
            localStorage.getItem(
                "selectedJourney"
            ) || "null"
        );


    const selectedSeats =
        JSON.parse(
            localStorage.getItem(
                "selectedSeats"
            ) || "[]"
        );


    const passengerData =
        JSON.parse(
            localStorage.getItem(
                "passengerDetails"
            ) || "{}"
        );


    // =====================================================
    // SUMMARY ELEMENTS
    // =====================================================

    const summaryTrainName =
        document.getElementById(
            "summaryTrainName"
        );


    const summaryTrainNumber =
        document.getElementById(
            "summaryTrainNumber"
        );


    const summaryFrom =
        document.getElementById(
            "summaryFrom"
        );


    const summaryTo =
        document.getElementById(
            "summaryTo"
        );


    const summaryDeparture =
        document.getElementById(
            "summaryDeparture"
        );


    const summaryArrival =
        document.getElementById(
            "summaryArrival"
        );


    const summaryDate =
        document.getElementById(
            "summaryDate"
        );


    const summaryCoach =
        document.getElementById(
            "summaryCoach"
        );


    const summarySeats =
        document.getElementById(
            "summarySeats"
        );


    const summaryPassengers =
        document.getElementById(
            "summaryPassengers"
        );


    const baseFare =
        document.getElementById(
            "baseFare"
        );


    const convenienceFee =
        document.getElementById(
            "convenienceFee"
        );


    const gst =
        document.getElementById(
            "gst"
        );


    const totalFare =
        document.getElementById(
            "totalFare"
        );


    // =====================================================
    // JOURNEY
    // =====================================================

    if (selectedTrain) {

        summaryTrainName.textContent =
            selectedTrain.name ||
            "Train";


        summaryTrainNumber.textContent =
            `Train No. ${
                selectedTrain.number || ""
            }`;


        summaryFrom.textContent =
            selectedTrain.from ||
            selectedJourney?.from ||
            "Chennai";


        summaryTo.textContent =
            selectedTrain.to ||
            selectedJourney?.to ||
            "Coimbatore";


        summaryDeparture.textContent =
            selectedTrain.departure ||
            "Departure";


        summaryArrival.textContent =
            selectedTrain.arrival ||
            "Arrival";

    }


    // =====================================================
    // DATE
    // =====================================================

    if (
        selectedJourney?.journeyDate
    ) {

        summaryDate.textContent =
            formatDisplayDate(
                selectedJourney.journeyDate
            );

    }


    // =====================================================
    // SEATS
    // =====================================================

    const seats =
        Array.isArray(selectedSeats)
            ? selectedSeats
            : [];


    summarySeats.textContent =
        seats.length
            ? seats.join(", ")
            : "Not selected";


    summaryPassengers.textContent =
        selectedJourney?.passengers ||
        passengerData?.length ||
        seats.length ||
        1;


    // =====================================================
    // COACH
    // =====================================================

    const selectedCoach =
        localStorage.getItem(
            "selectedCoach"
        ) ||
        localStorage.getItem(
            "activeCoach"
        ) ||
        "S1";


    summaryCoach.textContent =
        selectedCoach;


    // =====================================================
    // FARE
    // =====================================================

    const savedTotal =
        Number(
            localStorage.getItem(
                "totalFare"
            ) || 0
        );


    let baseAmount =
        savedTotal;


    if (
        !baseAmount &&
        selectedTrain
    ) {

        const passengerCount =
            Number(
                selectedJourney?.passengers ||
                seats.length ||
                1
            );


        baseAmount =
            Number(
                selectedTrain.fare || 0
            ) *
            passengerCount;

    }


    const convenience =
        baseAmount > 0
            ? Math.round(
                baseAmount * 0.02
            )
            : 0;


    const tax =
        baseAmount > 0
            ? Math.round(
                (baseAmount + convenience) *
                0.05
            )
            : 0;


    const finalTotal =
        baseAmount +
        convenience +
        tax;


    baseFare.textContent =
        `₹${baseAmount}`;


    convenienceFee.textContent =
        `₹${convenience}`;


    gst.textContent =
        `₹${tax}`;


    totalFare.textContent =
        `₹${finalTotal}`;


    payAmount.textContent =
        finalTotal;


    // =====================================================
    // PAYMENT METHOD
    // =====================================================

    let selectedMethod =
        "upi";


    paymentMethods.forEach(
        method => {

            method.addEventListener(
                "click",
                () => {

                    paymentMethods.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    method.classList.add(
                        "active"
                    );


                    selectedMethod =
                        method.dataset.method;


                    showPaymentForm(
                        selectedMethod
                    );

                }
            );

        }
    );


    function showPaymentForm(
        method
    ) {

        upiForm.classList.add(
            "hidden"
        );


        cardForm.classList.add(
            "hidden"
        );


        netbankingForm.classList.add(
            "hidden"
        );


        walletForm.classList.add(
            "hidden"
        );


        if (method === "upi") {

            upiForm.classList.remove(
                "hidden"
            );

        }


        if (method === "card") {

            cardForm.classList.remove(
                "hidden"
            );

        }


        if (
            method ===
            "netbanking"
        ) {

            netbankingForm.classList.remove(
                "hidden"
            );

        }


        if (
            method ===
            "wallet"
        ) {

            walletForm.classList.remove(
                "hidden"
            );

        }

    }


    // =====================================================
    // UPI VERIFY
    // =====================================================

    verifyUpiBtn.addEventListener(
        "click",
        () => {

            const value =
                upiId.value.trim();


            if (!value) {

                upiMessage.textContent =
                    "Please enter your UPI ID.";

                upiMessage.style.color =
                    "#d94848";

                return;

            }


            const upiPattern =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;


            if (
                !upiPattern.test(
                    value
                )
            ) {

                upiMessage.textContent =
                    "Please enter a valid UPI ID.";

                upiMessage.style.color =
                    "#d94848";

                return;

            }


            upiMessage.textContent =
                "✓ UPI ID verified successfully.";

            upiMessage.style.color =
                "#16895b";

        }
    );


    // =====================================================
    // CARD NUMBER
    // =====================================================

    cardNumber.addEventListener(
        "input",
        () => {

            let value =
                cardNumber.value
                    .replace(/\D/g, "")
                    .slice(0, 16);


            value =
                value.match(
                    /.{1,4}/g
                )?.join(" ") || "";


            cardNumber.value =
                value;


            cardPreviewNumber.textContent =
                value ||
                "•••• •••• •••• ••••";

        }
    );


    // =====================================================
    // CARD NAME
    // =====================================================

    cardName.addEventListener(
        "input",
        () => {

            cardPreviewName.textContent =
                cardName.value
                    .toUpperCase()
                    .trim() ||
                "CARD HOLDER";

        }
    );


    // =====================================================
    // CARD EXPIRY
    // =====================================================

    cardExpiry.addEventListener(
        "input",
        () => {

            let value =
                cardExpiry.value
                    .replace(/\D/g, "")
                    .slice(0, 4);


            if (
                value.length > 2
            ) {

                value =
                    value.slice(0, 2) +
                    "/" +
                    value.slice(2);

            }


            cardExpiry.value =
                value;


            cardPreviewExpiry.textContent =
                value ||
                "MM/YY";

        }
    );


    // =====================================================
    // CVV
    // =====================================================

    cardCvv.addEventListener(
        "input",
        () => {

            cardCvv.value =
                cardCvv.value
                    .replace(/\D/g, "")
                    .slice(0, 3);

        }
    );


    // =====================================================
    // WALLET
    // =====================================================

    walletOptions.forEach(
        wallet => {

            wallet.addEventListener(
                "click",
                () => {

                    walletOptions.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    wallet.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    // =====================================================
    // PAY
    // =====================================================

    payBtn.addEventListener(
        "click",
        () => {

            if (
                !validatePayment()
            ) {

                return;

            }


            savePayment();


            processingModal.classList.remove(
                "hidden"
            );


            setTimeout(
                () => {

                    processingModal.classList.add(
                        "hidden"
                    );


                    createTicket();

                },
                1800
            );

        }
    );


    // =====================================================
    // VALIDATE PAYMENT
    // =====================================================

    function validatePayment() {

        if (
            finalTotal <= 0
        ) {

            alert(
                "Invalid booking amount."
            );

            return false;

        }


        if (
            selectedMethod ===
            "upi"
        ) {

            const value =
                upiId.value.trim();


            const pattern =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/;


            if (
                !pattern.test(value)
            ) {

                alert(
                    "Please enter and verify a valid UPI ID."
                );

                return false;

            }

        }


        if (
            selectedMethod ===
            "card"
        ) {

            const number =
                cardNumber.value.replace(
                    /\s/g,
                    ""
                );


            if (
                number.length !== 16
            ) {

                alert(
                    "Please enter a valid 16-digit card number."
                );

                return false;

            }


            if (
                !cardName.value.trim()
            ) {

                alert(
                    "Please enter the card holder name."
                );

                return false;

            }


            if (
                !/^\d{2}\/\d{2}$/.test(
                    cardExpiry.value
                )
            ) {

                alert(
                    "Please enter a valid expiry date."
                );

                return false;

            }


            if (
                cardCvv.value.length !== 3
            ) {

                alert(
                    "Please enter a valid CVV."
                );

                return false;

            }

        }


        if (
            selectedMethod ===
            "netbanking"
        ) {

            if (
                !bankSelect.value
            ) {

                alert(
                    "Please select your bank."
                );

                return false;

            }

        }


        if (
            selectedMethod ===
            "wallet"
        ) {

            const selectedWallet =
                document.querySelector(
                    ".wallet-option.active"
                );


            if (!selectedWallet) {

                alert(
                    "Please select a wallet."
                );

                return false;

            }

        }


        return true;

    }


    // =====================================================
    // SAVE PAYMENT
    // =====================================================

    function savePayment() {

        let paymentDetails = {

            method:
                selectedMethod,

            amount:
                finalTotal,

            transactionStatus:
                "SUCCESS",

            transactionId:
                generateTransactionId(),

            paymentDate:
                new Date().toISOString()

        };


        if (
            selectedMethod ===
            "upi"
        ) {

            paymentDetails.upiId =
                upiId.value.trim();

        }


        if (
            selectedMethod ===
            "card"
        ) {

            paymentDetails.cardLast4 =
                cardNumber.value
                    .replace(/\s/g, "")
                    .slice(-4);

        }


        if (
            selectedMethod ===
            "netbanking"
        ) {

            paymentDetails.bank =
                bankSelect.value;

        }


        if (
            selectedMethod ===
            "wallet"
        ) {

            paymentDetails.wallet =
                document.querySelector(
                    ".wallet-option.active"
                )?.dataset.wallet;

        }


        localStorage.setItem(
            "paymentDetails",
            JSON.stringify(
                paymentDetails
            )
        );

    }


    // =====================================================
    // CREATE TICKET
    // =====================================================

    function createTicket() {

        const ticket = {

            pnr:
                generatePNR(),

            train:
                selectedTrain,

            journey:
                selectedJourney,

            seats,

            coach:
                selectedCoach,

            passenger:
                passengerData,

            payment:
                JSON.parse(
                    localStorage.getItem(
                        "paymentDetails"
                    ) || "{}"
                ),

            totalFare:
                finalTotal,

            bookingStatus:
                "Confirmed",

            bookingDate:
                new Date().toISOString()

        };


        localStorage.setItem(
            "bookingTicket",
            JSON.stringify(ticket)
        );


        /*
         * Change "ticket" below if your
         * ticket module uses another route name.
         */

        navigate(
            "ticket",
            app
        );

    }


    // =====================================================
    // HELPERS
    // =====================================================

    function generatePNR() {

        return (
            "RB" +
            Math.floor(
                1000000000 +
                Math.random() *
                9000000000
            )
        );

    }


    function generateTransactionId() {

        return (
            "TXN" +
            Date.now() +
            Math.floor(
                Math.random() * 1000
            )
        );

    }


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

