
const express = require("express");

const router = express.Router();

const authController =
    require("../controllers/authController");


// ==================================================
// LOGIN
// POST /api/auth/login
// ==================================================

router.post(
    "/login",
    authController.login
);


// ==================================================
// SIGNUP
// POST /api/auth/signup
// ==================================================

router.post(
    "/signup",
    authController.signup
);


// ==================================================
// TEST AUTH ROUTE
// GET /api/auth/test
// ==================================================

router.get(
    "/test",
    (req, res) => {

        res.status(200).json({

            success: true,

            message:
                "Auth route is working"

        });

    }
);


// ==================================================
// EXPORT ROUTER
// ==================================================

module.exports = router;
