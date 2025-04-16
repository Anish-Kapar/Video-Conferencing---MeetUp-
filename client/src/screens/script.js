function redirectToLogin() {
    window.location.href = "login.html";
}

async function login() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch("users.json");
    const users = await response.json();

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}

async function signup() {
    const username = document.getElementById("signupUsername").value;
    const password = document.getElementById("signupPassword").value;

    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Send new user data to server.js
    const response = await fetch("/save-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }) // Send only one user
    });

    if (response.ok) {
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
    } else {
        const errorText = await response.text();
        alert(errorText);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        document.getElementById("loginBtn").innerText = loggedInUser;
    }
});


document.addEventListener("DOMContentLoaded", async () => {
    const loginBtn = document.getElementById("loginBtn");
    let lastServerRestart = localStorage.getItem("serverRestartTime");

    try {
        const response = await fetch("/server-status");
        const data = await response.json();

        if (lastServerRestart !== data.lastRestart) {
            // Server restart ho chuka hai, localStorage clear karo
            localStorage.removeItem("loggedInUser");
            localStorage.setItem("serverRestartTime", data.lastRestart);
        }
    } catch (error) {
        console.error("Error checking server status:", error);
    }

    // Login button update karna
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        loginBtn.innerText = loggedInUser;
    } else {
        loginBtn.innerText = "Login";
    }
});

