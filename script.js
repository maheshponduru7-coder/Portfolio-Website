// =========================
// WELCOME BUTTON
// =========================

let welcomeButton =
    document.getElementById("welcomeButton");

let welcomeMessage =
    document.getElementById("welcomeMessage");


welcomeButton.addEventListener("click", function () {

    welcomeMessage.textContent =
        "Thanks for visiting my portfolio!";

});


// =========================
// PROJECT BUTTON
// =========================

let projectButton =
    document.getElementById("projectButton");


projectButton.addEventListener("click", function () {

    alert("Check out my Java and DSA projects!");

});


// =========================
// ABOUT SHOW / HIDE
// =========================

let aboutButton =
    document.getElementById("aboutButton");

let moreAbout =
    document.getElementById("moreAbout");


aboutButton.addEventListener("click", function () {

    if (moreAbout.style.display === "none") {

        moreAbout.style.display = "block";

        aboutButton.textContent = "Show Less";

    } else {

        moreAbout.style.display = "none";

        aboutButton.textContent = "Show More";

    }

});


// =========================
// CONSOLE MESSAGE
// =========================

console.log(
    "Portfolio website loaded successfully!"
);


// =========================
// CONTACT FORM VALIDATION
// =========================

let contactForm =
    document.getElementById("contactForm");

let nameInput =
    document.getElementById("name");

let emailInput =
    document.getElementById("email");

let messageInput =
    document.getElementById("message");

let formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let name =
        nameInput.value.trim();

    let email =
        emailInput.value.trim();

    let message =
        messageInput.value.trim();


    if (name === "") {

        formMessage.textContent =
            "Please enter your name.";

        return;

    }


    if (email === "") {

        formMessage.textContent =
            "Please enter your email.";

        return;

    }


    if (!email.includes("@")) {

        formMessage.textContent =
            "Please enter a valid email.";

        return;

    }


    if (message === "") {

        formMessage.textContent =
            "Please enter your message.";

        return;

    }


    formMessage.textContent =
        "Thank you! Your message has been submitted.";

    contactForm.reset();

});


// =========================
// PROJECT FILTER
// =========================

let filterButtons =
    document.querySelectorAll(".filter-btn");

let projectCards =
    document.querySelectorAll(".project-card");


filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let filter =
            button.getAttribute("data-filter");


        filterButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        button.classList.add("active");


        projectCards.forEach(function (card) {

            let category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category.includes(filter)
            ) {

                card.classList.remove("hide");

            } else {

                card.classList.add("hide");

            }

        });

    });

});


// =========================
// DARK MODE
// =========================

let themeButton =
    document.getElementById("themeButton");


themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");


    if (
        document.body.classList.contains("dark-mode")
    ) {

        themeButton.textContent =
            "☀️ Light Mode";

    } else {

        themeButton.textContent =
            "🌙 Dark Mode";

    }

});


// =========================
// MOBILE MENU
// =========================

let menuButton =
    document.getElementById("menuButton");

let navLinks =
    document.getElementById("navLinks");


menuButton.addEventListener("click", function () {

    navLinks.classList.toggle("show");


    if (navLinks.classList.contains("show")) {

        menuButton.textContent = "✕";

    } else {

        menuButton.textContent = "☰";

    }

});


// =========================
// CLOSE MOBILE MENU
// WHEN LINK IS CLICKED
// =========================

let navigationLinks =
    document.querySelectorAll(".nav-links a");


navigationLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("show");

        menuButton.textContent = "☰";

    });

});