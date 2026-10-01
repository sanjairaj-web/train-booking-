import { navigate } from "./router.js";

const app =
    document.getElementById("app");


// ==============================
// CHECK LOGIN
// ==============================

const isLoggedIn =
    localStorage.getItem(
        "isLoggedIn"
    );


// ==============================
// INITIAL NAVIGATION
// ==============================

// if (isLoggedIn === "true") {

//     navigate("search", app);

// } else {

//     navigate("login", app);

// }

navigate("login", app);