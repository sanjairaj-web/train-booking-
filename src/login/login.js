import "./login.css";
import loginHTML from "./login.html";

import { navigate } from "../router.js";


export function showLogin(app) {

    // =========================
    // LOAD LOGIN PAGE
    // =========================

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
    // PASSWORD TOGGLE
    // =========================

    if (togglePassword) {

        togglePassword.addEventListener(
            "click",
            () => {

                if (
                    passwordInput.type ===
                    "password"
                ) {

                    passwordInput.type =
                        "text";

                    togglePassword.textContent =
                        "🙈";

                } else {

                    passwordInput.type =
                        "password";

                    togglePassword.textContent =
                        "👁";

                }

            }
        );

    }


    // =========================
    // LOGIN FORM
    // =========================

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =========================
            // GET VALUES
            // =========================

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            // =========================
            // VALIDATION
            // =========================

            if (!email || !password) {

                showMessage(
                    "Please enter email and password.",
                    "error"
                );

                return;

            }


            // Email validation

            if (
                !email.includes("@") ||
                !email.includes(".")
            ) {

                showMessage(
                    "Please enter a valid email.",
                    "error"
                );

                return;

            }


            // =========================
            // LOADING
            // =========================

            showMessage(
                "Logging in...",
                "success"
            );


            const loginButton =
                loginForm.querySelector(
                    'button[type="submit"]'
                );


            if (loginButton) {

                loginButton.disabled = true;

                loginButton.textContent =
                    "Logging in...";

            }


            try {

                // =========================
                // CALL LOGIN API
                // =========================

                const response =
                    await fetch(
                       // "http://localhost:5000/api/auth/login",
                        "https://train-booking-ktigtks51-sanjairaj-1568.vercel.app/api/auth/login",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                email: email,

                                password: password

                            })

                        }
                    );


                // =========================
                // READ API RESPONSE
                // =========================

                const data =
                    await response.json();


                console.log(
                    "Login API Response:",
                    data
                );


                // =========================
                // LOGIN FAILED
                // =========================

                if (!response.ok) {

                    showMessage(
                        data.message ||
                        "Invalid email or password.",
                        "error"
                    );

                    return;

                }


                // =========================
                // CHECK USER
                // =========================

                if (!data.user) {

                    showMessage(
                        "Login response is invalid.",
                        "error"
                    );

                    return;

                }


                // =========================
                // SAVE LOGIN STATE
                // =========================

                localStorage.setItem(
                    "isLoggedIn",
                    "true"
                );


                localStorage.setItem(
                    "loggedInUser",
                    JSON.stringify(
                        data.user
                    )
                );


                // =========================
                // SUCCESS MESSAGE
                // =========================

                showMessage(
                    `Welcome back, ${data.user.name}!`,
                    "success"
                );


                // =========================
                // GO TO SEARCH
                // =========================

                setTimeout(() => {

                    navigate(
                        "search",
                        app
                    );

                }, 700);


            } catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                showMessage(
                    "Unable to connect to server. Please start the backend server.",
                    "error"
                );

            }

            finally {

                // =========================
                // ENABLE LOGIN BUTTON
                // =========================

                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.textContent =
                        "Login";

                }

            }

        }
    );


    // =========================
    // GO TO SIGNUP
    // =========================

    if (signupButton) {

        signupButton.addEventListener(
            "click",
            () => {

                navigate(
                    "signup",
                    app
                );

            }
        );

    }


    // =========================
    // MESSAGE FUNCTION
    // =========================

    function showMessage(
        text,
        type
    ) {

        message.textContent =
            text;

        message.className =
            `message ${type}`;

    }

}