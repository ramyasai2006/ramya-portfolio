alert("✅ Script Loaded");

const form = document.getElementById("contact-form");
const response = document.getElementById("response");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const inputs = form.querySelectorAll("input, textarea");

        const data = {
            name: inputs[0].value,
            email: inputs[1].value,
            message: inputs[2].value
        };

        try {

            const result = await fetch("/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const output = await result.json();

            if (result.ok) {
                response.innerHTML = "✅ " + output.message;
                form.reset();
            } else {
                response.innerHTML = "❌ " + output.message;
            }

        } catch (error) {
            console.error(error);
            response.innerHTML = "⚠️ Backend server is not running";
        }
    });
}

// Theme Button
const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    });
}

// Typing Effect
const typingText = document.getElementById("typing-text");

const text =
    "Passionate about Flutter, Web Development and UI/UX Design";

let index = 0;

function typeText() {
    if (typingText && index < text.length) {
        typingText.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeText, 80);
    }
}

if (typingText) {
    typeText();
}