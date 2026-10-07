const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "railbook"
});

// Connect to MySQL
db.connect((error) => {

    if (error) {
        console.error("❌ MySQL connection failed:");
        console.error(error.message);
        return;
    }

    console.log("✅ MySQL connected successfully!");
});

module.exports = db;
