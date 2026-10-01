import { showLogin } from "./login/login.js";
import { showSignup } from "./signup/signup.js";
import { showSearch } from "./search/search.js";
import { showSeat } from "./seat/seat.js";
import{ showPassenger } from "./passenger/passenger.js";
import { showPayment } from "./payment/payment.js";


export function navigate(page, app) {

    switch (page) {

        // =========================
        // LOGIN
        // =========================
        case "login":

            showLogin(app);

            break;


        // =========================
        // SIGNUP
        // =========================
        case "signup":

            showSignup(app);

            break;


        // =========================
        // TRAIN SEARCH
        // =========================
        case "search":

            showSearch(app);

            break;


        // =========================
        // SEAT SELECTION
        // =========================
        case "seat":

            showSeat(app);

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

        

        // =========================
        // DEFAULT
        // =========================
        default:

            console.log(
                "Unknown route:",
                page
            );

            showLogin(app);

    }

}