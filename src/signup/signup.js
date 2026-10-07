import "./signup.css";
import signupHTML from "./signup.html";

import { navigate } from "../router.js";


export function showSignup(app) {

    // =========================
    // LOAD SIGNUP PAGE
    // =========================

    app.innerHTML = signupHTML;


    // =========================
    // GET ELEMENTS
    // =========================

    const signupForm =
        document.getElementById("signupForm");

    const nameInput =
        document.getElementById("signupName");

    const emailInput =
        document.getElementById("signupEmail");

    const passwordInput =
        document.getElementById("signupPassword");

    const confirmPasswordInput =
        document.getElementById("confirmPassword");

    const togglePassword =
        document.getElementById(
            "toggleSignupPassword"
        );

    const message =
        document.getElementById("signupMessage");

    const loginButton =
        document.getElementById("goToLogin");


    // =========================
    // PASSWORD TOGGLE
    // =========================

    togglePassword.addEventListener(
        "click",
        () => {

            if (
                passwordInput.type === "password"
            ) {

                passwordInput.type = "text";

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


    // =========================
    // SIGNUP
    // =========================

    signupForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            // =========================
            // GET VALUES
            // =========================

            const name =
                nameInput.value.trim();

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            // =========================
            // VALIDATION
            // =========================

            if (name.length < 3) {

                showMessage(
                    "Enter a valid name.",
                    "error"
                );

                return;
            }


            if (!email) {

                showMessage(
                    "Enter your email.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;
            }


            if (
                password !==
                confirmPassword
            ) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            // =========================
            // SHOW LOADING
            // =========================

            showMessage(
                "Creating account...",
                "success"
            );


            try {

                // =========================
                // CALL BACKEND API
                // =========================

                const response =
                    await fetch(
                       //"http://localhost:5000/api/auth/signup",
                        "https://train-booking-ktigtks51-sanjairaj-1568.vercel.app/api/auth/signup",
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                name: name,

                                email: email,

                                password: password

                            })

                        }
                    );


                // =========================
                // READ RESPONSE
                // =========================

                const data =
                    await response.json();


                console.log(
                    "Signup API Response:",
                    data
                );


                // =========================
                // API ERROR
                // =========================

                if (!response.ok) {

                    showMessage(
                        data.message ||
                        "Signup failed.",
                        "error"
                    );

                    return;
                }


                // =========================
                // SUCCESS
                // =========================

                showMessage(
                    "Account created successfully!",
                    "success"
                );


                // =========================
                // CLEAR FORM
                // =========================

                signupForm.reset();


                // =========================
                // GO TO LOGIN
                // =========================

                setTimeout(() => {

                    navigate(
                        "login",
                        app
                    );

                }, 1000);


            } catch (error) {

                console.error(
                    "SIGNUP ERROR:",
                    error
                );


                showMessage(
                    "Unable to connect to server.",
                    "error"
                );

            }

        }
    );


    // =========================
    // GO TO LOGIN
    // =========================

    loginButton.addEventListener(
        "click",
        () => {

            navigate(
                "login",
                app
            );

        }
    );


    // =========================
    // MESSAGE
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