import "./signup.css";
import signupHTML from "./signup.html";

import { showLogin } from "../login/login.js";


export function showSignup(app) {

    // Load signup page
    app.innerHTML = signupHTML;


    // =========================
    // GET ELEMENTS
    // =========================

    const signupForm =
        document.getElementById(
            "signupForm"
        );

    const nameInput =
        document.getElementById(
            "signupName"
        );

    const emailInput =
        document.getElementById(
            "signupEmail"
        );

    const passwordInput =
        document.getElementById(
            "signupPassword"
        );

    const confirmPasswordInput =
        document.getElementById(
            "confirmPassword"
        );

    const message =
        document.getElementById(
            "signupMessage"
        );

    const togglePassword =
        document.getElementById(
            "toggleSignupPassword"
        );

    const loginButton =
        document.getElementById(
            "goToLogin"
        );


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
    // SIGNUP
    // =========================

    signupForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


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
                    "Name must contain at least 3 characters.",
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
                password !== confirmPassword
            ) {

                showMessage(
                    "Passwords do not match.",
                    "error"
                );

                return;
            }


            // =========================
            // CHECK EXISTING USER
            // =========================

            const existingUser =
                localStorage.getItem(
                    "trainBookingUser"
                );


            if (existingUser) {

                const user =
                    JSON.parse(existingUser);


                if (
                    user.email.toLowerCase() ===
                    email.toLowerCase()
                ) {

                    showMessage(
                        "An account with this email already exists.",
                        "error"
                    );

                    return;
                }

            }


            // =========================
            // CREATE USER
            // =========================

            const user = {

                name: name,

                email: email,

                password: password

            };


            localStorage.setItem(
                "trainBookingUser",
                JSON.stringify(user)
            );


            // =========================
            // SUCCESS
            // =========================

            showMessage(
                "Account created successfully!",
                "success"
            );


            signupForm.reset();


            // Go to login
            setTimeout(() => {

                showLogin(app);

            }, 1000);

        }
    );


    // =========================
    // GO TO LOGIN
    // =========================

    loginButton.addEventListener(
        "click",
        () => {

            showLogin(app);

        }
    );


    // =========================
    // MESSAGE
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