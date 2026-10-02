import { showLogin } from "./login/login.js";
import { showSearch } from "./search/search.js";
import { showSeat } from "./seat/seat.js";
import { showPassenger } from "./passenger/passenger.js";
import { showPayment } from "./payment/payment.js";
import { showTicket } from "./ticket/ticket.js";
import { showMyBooking } from "./mybooking/mybooking.js";


export function navigate(
    page,
    app
) {

    switch (page) {

        case "login":

            showLogin(app);

            break;


        case "search":

            showSearch(app);

            break;


        case "seat":

            showSeat(app);

            break;


        case "passenger":

            showPassenger(app);

            break;


        case "payment":

            showPayment(app);

            break;


        case "ticket":

            showTicket(app);

            break;


        case "mybooking":

            showMyBooking(app);

            break;


        default:

            showSearch(app);

    }

}