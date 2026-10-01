import "./login.css";
import loginHTML from "./login.html";

import { showSignup } from "../signup/signup.js";


export function showLogin(app) {

    // Load login page
    app.innerHTML = loginHTML;


    // =========================
    // GET ELEMENTS
    // =========================

    const loginForm =
        document.getElementById("loginForm");

    const emailInput =
        document.getElementById("loginEmail");

    const passwordInput =
        document.getElementById("loginPassword");

    const message =
        document.getElementById("loginMessage");

    const togglePassword =
        document.getElementById(
            "toggleLoginPassword"
        );

    const signupButton =
        document.getElementById("goToSignup");


    // =========================
    // TOGGLE PASSWORD
    // =========================

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

                togglePassword.textContent = "🙈";

            } else {

                passwordInput.type = "password";

                togglePassword.textContent = "👁";

            }

        }
    );


    // =========================
    // LOGIN
    // =========================

    loginForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            // Get registered user
            const storedUser =
                localStorage.getItem(
                    "trainBookingUser"
                );


            if (!storedUser) {

                showMessage(
                    "No account found. Please sign up first.",
                    "error"
                );

                return;
            }


            const user =
                JSON.parse(storedUser);


            // Check credentials
            if (
                email === user.email &&
                password === user.password
            ) {

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(user)
                );


                showMessage(
                    `Welcome back, ${user.name}!`,
                    "success"
                );


                // Temporary next page
                setTimeout(() => {

                    alert(
                        "Login successful! Train Search page will come next."
                    );

                }, 500);

            } else {

                showMessage(
                    "Invalid email or password.",
                    "error"
                );

            }

        }
    );


    // =========================
    // GO TO SIGNUP
    // =========================

    signupButton.addEventListener(
        "click",
        () => {

            showSignup(app);

        }
    );


    // =========================
    // MESSAGE FUNCTION
    // =========================

    function showMessage(
        text,
        type
    ) {

        message.textContent = text;

        message.className =
            `message ${type}`;

    }

}