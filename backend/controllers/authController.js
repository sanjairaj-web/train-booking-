const userModel =
    require("../models/userModel");

const bcrypt =
    require("bcryptjs");


// ==================================================
// LOGIN CONTROLLER
// ==================================================

async function login(req, res) {

    try {

        const {
            email,
            password
        } = req.body;


        // ------------------------------
        // VALIDATION
        // ------------------------------

        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required"

            });

        }


        // ------------------------------
        // CLEAN EMAIL
        // ------------------------------

        const cleanEmail =
            email.trim().toLowerCase();


        // ------------------------------
        // FIND USER
        // ------------------------------

        const user =
            await userModel.findByEmail(
                cleanEmail
            );


        // ------------------------------
        // USER NOT FOUND
        // ------------------------------

        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // ------------------------------
        // CHECK PASSWORD
        // ------------------------------

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        // ------------------------------
        // INVALID PASSWORD
        // ------------------------------

        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password"

            });

        }


        // ------------------------------
        // LOGIN SUCCESS
        // ------------------------------

        return res.status(200).json({

            success: true,

            message:
                "Login successful",

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            }

        });

    }

    catch (error) {

        console.error(
            "LOGIN ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Internal server error"

        });

    }

}


// ==================================================
// SIGNUP CONTROLLER
// ==================================================

async function signup(req, res) {

    try {

        const {
            name,
            email,
            password
        } = req.body;


        // ------------------------------
        // REQUIRED VALIDATION
        // ------------------------------

        if (
            !name ||
            !email ||
            !password
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Name, email and password are required"

            });

        }


        // ------------------------------
        // CLEAN DATA
        // ------------------------------

        const cleanName =
            name.trim();

        const cleanEmail =
            email.trim().toLowerCase();


        // ------------------------------
        // NAME VALIDATION
        // ------------------------------

        if (cleanName.length < 3) {

            return res.status(400).json({

                success: false,

                message:
                    "Name must contain at least 3 characters"

            });

        }


        // ------------------------------
        // EMAIL VALIDATION
        // ------------------------------

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailRegex.test(cleanEmail)) {

            return res.status(400).json({

                success: false,

                message:
                    "Please enter a valid email"

            });

        }


        // ------------------------------
        // PASSWORD VALIDATION
        // ------------------------------

        if (password.length < 6) {

            return res.status(400).json({

                success: false,

                message:
                    "Password must contain at least 6 characters"

            });

        }


        // ------------------------------
        // CHECK EXISTING USER
        // ------------------------------

        const existingUser =
            await userModel.findByEmail(
                cleanEmail
            );


        if (existingUser) {

            return res.status(409).json({

                success: false,

                message:
                    "Email already registered"

            });

        }


        // ------------------------------
        // HASH PASSWORD
        // ------------------------------

        const hashedPassword =
            await bcrypt.hash(
                password,
                10
            );


        // ------------------------------
        // CREATE USER
        // ------------------------------

        const newUser =
            await userModel.createUser(

                cleanName,

                cleanEmail,

                hashedPassword

            );


        // ------------------------------
        // SUCCESS
        // ------------------------------

        return res.status(201).json({

            success: true,

            message:
                "Account created successfully",

            user: {

                id: newUser.id,

                name: newUser.name,

                email: newUser.email

            }

        });

    }

    catch (error) {

        console.error(
            "SIGNUP ERROR:",
            error
        );


        // Duplicate email safety check
        if (error.code === "ER_DUP_ENTRY") {

            return res.status(409).json({

                success: false,

                message:
                    "Email already registered"

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Internal server error"

        });

    }

}


// ==================================================
// EXPORT
// ==================================================

module.exports = {

    login,

    signup

};