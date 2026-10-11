// ==========================================================================
// PORTFOLIO JAVASCRIPT - MAHESH
// Features: Interactive Particle Background, Smooth Navigation, Filters & Validation
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================================================
    // 1. PREMIUM ANIMATED PARTICLE BACKGROUND
    // Lightweight, subtle, 60fps canvas engine with theme awareness & reduced-motion
    // ==========================================================================

    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let animationFrameId = null;
        let particles = [];
        let width = 0;
        let height = 0;

        // Mouse tracking for subtle hover interaction
        const mouse = {
            x: null,
            y: null,
            radius: 120
        };

        // Accessibility: Check reduced motion preference
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let prefersReducedMotion = motionQuery.matches;

        motionQuery.addEventListener("change", function (e) {
            prefersReducedMotion = e.matches;
            if (prefersReducedMotion) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
                ctx.clearRect(0, 0, width, height);
            } else {
                initParticles();
                animate();
            }
        });

        // Theme-aware palette generator
        function getThemeColors() {
            const isDark = document.body.classList.contains("dark-mode");
            return {
                particleRGB: isDark ? "129, 140, 248" : "99, 102, 241",
                particleAccentRGB: isDark ? "56, 189, 248" : "59, 130, 246",
                lineRGB: isDark ? "129, 140, 248" : "99, 102, 241",
                maxLineAlpha: isDark ? 0.15 : 0.12,
                particleAlphaMin: isDark ? 0.2 : 0.15,
                particleAlphaMax: isDark ? 0.6 : 0.45
            };
        }

        // Particle Class
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 2 + 1.2;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
                this.alpha = Math.random() * 0.35 + 0.15;
                this.pulseSpeed = Math.random() * 0.015 + 0.005;
                this.pulseDir = Math.random() > 0.5 ? 1 : -1;
                this.isAccent = Math.random() > 0.7;
            }

            update() {
                // Gentle drift
                this.x += this.vx;
                this.y += this.vy;

                // Soft alpha pulse
                this.alpha += this.pulseSpeed * this.pulseDir;
                if (this.alpha > 0.55 || this.alpha < 0.15) {
                    this.pulseDir *= -1;
                }

                // Screen wrap
                if (this.x < 0) this.x = width;
                else if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                else if (this.y > height) this.y = 0;

                // Subtle cursor repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        const angle = Math.atan2(dy, dx);
                        this.x += Math.cos(angle) * force * 1.5;
                        this.y += Math.sin(angle) * force * 1.5;
                    }
                }
            }

            draw(colors) {
                const rgb = this.isAccent ? colors.particleAccentRGB : colors.particleRGB;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, ${this.alpha})`;
                ctx.fill();
            }
        }

        // Initialize particles based on screen size
        function initParticles() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            // Responsive particle count (lightweight & performant)
            const count = Math.min(50, Math.max(18, Math.floor(width / 32)));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        // Draw delicate constellation connections
        function drawLines(colors) {
            const maxDistance = 115;
            const pLen = particles.length;

            for (let i = 0; i < pLen; i++) {
                for (let j = i + 1; j < pLen; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - dist / maxDistance) * colors.maxLineAlpha;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${colors.lineRGB}, ${alpha})`;
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }
        }

        // Animation Loop
        function animate() {
            if (prefersReducedMotion) return;

            ctx.clearRect(0, 0, width, height);
            const colors = getThemeColors();

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(colors);
            }

            // Draw connection lines
            drawLines(colors);

            animationFrameId = requestAnimationFrame(animate);
        }

        // Resize handler (debounced)
        let resizeTimeout;
        window.addEventListener("resize", function () {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(function () {
                initParticles();
            }, 150);
        });

        // Mouse listeners
        window.addEventListener("mousemove", function (e) {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener("mouseleave", function () {
            mouse.x = null;
            mouse.y = null;
        });

        // Pause loop when tab is hidden to preserve battery & CPU
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                if (animationFrameId) cancelAnimationFrame(animationFrameId);
            } else if (!prefersReducedMotion) {
                animate();
            }
        });

        // Start animation if motion is allowed
        if (!prefersReducedMotion) {
            initParticles();
            animate();
        }
    }


    // ==========================================================================
    // 2. WELCOME BUTTON
    // ==========================================================================

    const welcomeButton = document.getElementById("welcomeButton");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (welcomeButton && welcomeMessage) {
        welcomeButton.addEventListener("click", function () {
            welcomeMessage.textContent = "Thanks for visiting my portfolio!";
        });
    }


    // ==========================================================================
    // 3. PROJECT BUTTON (SHOW PROJECTS)
    // ==========================================================================

    const projectButton = document.getElementById("projectButton");

    if (projectButton) {
        projectButton.addEventListener("click", function () {
            const projectsSection = document.getElementById("projects");
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: "smooth" });
            }
        });
    }


    // ==========================================================================
    // 4. ABOUT SHOW / HIDE TOGGLE
    // ==========================================================================

    const aboutButton = document.getElementById("aboutButton");
    const moreAbout = document.getElementById("moreAbout");

    if (aboutButton && moreAbout) {
        aboutButton.addEventListener("click", function () {
            const isCurrentlyHidden =
                moreAbout.style.display === "none" ||
                window.getComputedStyle(moreAbout).display === "none";

            if (isCurrentlyHidden) {
                moreAbout.style.display = "block";
                aboutButton.textContent = "Show Less";
            } else {
                moreAbout.style.display = "none";
                aboutButton.textContent = "Show More";
            }
        });
    }


    // ==========================================================================
    // 5. CONTACT FORM VALIDATION
    // ==========================================================================

    const contactForm = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && nameInput && emailInput && messageInput && formMessage) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (name === "") {
                formMessage.textContent = "Please enter your name.";
                formMessage.style.color = "#ef4444";
                return;
            }

            if (email === "") {
                formMessage.textContent = "Please enter your email.";
                formMessage.style.color = "#ef4444";
                return;
            }

            if (!email.includes("@")) {
                formMessage.textContent = "Please enter a valid email.";
                formMessage.style.color = "#ef4444";
                return;
            }

            if (message === "") {
                formMessage.textContent = "Please enter your message.";
                formMessage.style.color = "#ef4444";
                return;
            }

            formMessage.textContent = "Thank you! Your message has been submitted.";
            formMessage.style.color = "var(--accent-primary)";
            contactForm.reset();
        });
    }


    // ==========================================================================
    // 6. PROJECT FILTERING
    // ==========================================================================

    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const filter = button.getAttribute("data-filter");

            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            projectCards.forEach(function (card) {
                const category = card.getAttribute("data-category") || "";

                if (filter === "all" || category.includes(filter)) {
                    card.classList.remove("hide");
                } else {
                    card.classList.add("hide");
                }
            });
        });
    });


    // ==========================================================================
    // 7. DARK MODE TOGGLE
    // ==========================================================================

    const themeButton = document.getElementById("themeButton");

    if (themeButton) {
        themeButton.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                themeButton.textContent = "☀️ Light Mode";
            } else {
                themeButton.textContent = "🌙 Dark Mode";
            }
        });
    }


    // ==========================================================================
    // 8. MOBILE MENU TOGGLE
    // ==========================================================================

    const menuButton = document.getElementById("menuButton");
    const navLinks = document.getElementById("navLinks");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", function () {
            navLinks.classList.toggle("show");

            if (navLinks.classList.contains("show")) {
                menuButton.textContent = "✕";
            } else {
                menuButton.textContent = "☰";
            }
        });
    }


    // ==========================================================================
    // 9. CLOSE MOBILE MENU WHEN LINK IS CLICKED
    // ==========================================================================

    const navigationLinks = document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navLinks) {
                navLinks.classList.remove("show");
            }
            if (menuButton) {
                menuButton.textContent = "☰";
            }
        });
    });


    // ==========================================================================
    // CONSOLE CONFIRMATION
    // ==========================================================================

    console.log("Portfolio website loaded successfully!");

});