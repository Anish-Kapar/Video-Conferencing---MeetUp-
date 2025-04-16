const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// Route to handle user signup
app.post("/save-user", (req, res) => {
    const newUser = req.body;

    // Read existing users from users.json
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading user data.");
        }

        let users = [];
        if (data) {
            users = JSON.parse(data);
        }

        // Check if username already exists
        if (users.some(user => user.username === newUser.username)) {
            return res.status(400).send("Username already exists.");
        }

        // Add new user
        users.push(newUser);

        // Write back to users.json
        fs.writeFile("users.json", JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).send("Error saving user.");
            }
            res.send("User registered successfully!");
        });
    });
});



// Flag file to check if server restarted
const FLAG_FILE = "server-restart-flag.txt";

// Jab server start hoga, tab ek flag file create ya update karega
fs.writeFileSync(FLAG_FILE, Date.now().toString());

app.get("/server-status", (req, res) => {
    const lastRestart = fs.readFileSync(FLAG_FILE, "utf8");
    res.json({ lastRestart });
});

app.listen(3000, () => console.log("Server running on port 3000"));
