import "./signup.css";

import signupHTML from "./signup.html";

import { navigate } from "../router.js";


export function showSignup(app) {

    app.innerHTML = signupHTML;


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

    const message =
        document.getElementById("signupMessage");

    const loginButton =
        document.getElementById("goToLogin");


    // =========================
    // SIGNUP
    // =========================

    signupForm.addEventListener(
        "submit",
        function (event) {

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
                    "Enter a valid name.",
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
            // SAVE USER
            // =========================

            const user = {

                name,

                email,

                password

            };


            localStorage.setItem(
                "trainBookingUser",
                JSON.stringify(user)
            );


            showMessage(
                "Account created successfully!",
                "success"
            );


            // =========================
            // GO TO LOGIN
            // =========================

            setTimeout(() => {

                navigate(
                    "login",
                    app
                );

            }, 1000);

        }
    );


    // =========================
    // LOGIN NAVIGATION
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


    function showMessage(
        text,
        type
    ) {

        message.textContent = text;

        message.className =
            `message ${type}`;

    }

}