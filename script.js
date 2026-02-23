document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // Smooth Scroll
    // =====================================
    window.scrollToSection = function (id) {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    // =====================================
    // Mobile Navigation Toggle
    // =====================================
    const navToggle = document.getElementById("navToggle");
    const siteNav = document.getElementById("siteNav");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", function () {
            const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
            navToggle.setAttribute("aria-expanded", String(!isExpanded));
            siteNav.classList.toggle("active");
        });

        siteNav.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                if (window.innerWidth <= 900) {
                    siteNav.classList.remove("active");
                    navToggle.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    // =====================================
    // Footer Year
    // =====================================
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // =====================================
    // EMAILJS CONFIGURATION
    // =====================================
    if (typeof emailjs === "undefined") {
        console.error("EmailJS not loaded. Check CDN script.");
        return;
    }

    emailjs.init("a1wK-h7DCcGARsI3G"); // Public Key

    const form = document.getElementById("contactForm");
    const formMsg = document.getElementById("formMsg");
    const submitBtn = document.getElementById("submitBtn");
    const loader = document.getElementById("loader");
    const btnText = document.querySelector(".btn-text");

    if (form) {

        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Safety check
            if (!submitBtn || !loader || !btnText) return;

            // Loading state
            submitBtn.disabled = true;
            loader.style.display = "inline-block";
            btnText.textContent = "Sending...";

            if (formMsg) {
                formMsg.textContent = "";
            }

            const serviceID = "service_dem3cxf";

            // 1️⃣ Send to Website Owner
            const ownerEmail = emailjs.sendForm(
                serviceID,
                "template_wbbvvni",
                form
            );

            // 2️⃣ Auto Reply to Visitor
            const autoReply = emailjs.sendForm(
                serviceID,
                "template_cf70bdg",
                form
            );

            Promise.all([ownerEmail, autoReply])
                .then(function () {

                    if (formMsg) {
                        formMsg.textContent = "Message sent successfully!";
                        formMsg.style.color = "green";
                    }

                    form.reset();
                })
                .catch(function (error) {

                    if (formMsg) {
                        formMsg.textContent = "Failed to send message. Try again.";
                        formMsg.style.color = "red";
                    }

                    console.error("EmailJS Error:", error);
                })
                .finally(function () {
                    submitBtn.disabled = false;
                    loader.style.display = "none";
                    btnText.textContent = "Send Message";
                });

        });
    }

});

// =====================================
// Section Reveal Animation
// =====================================
window.addEventListener("scroll", function () {
    document.querySelectorAll(".section").forEach(function (section) {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 100) {
            section.classList.add("show");
        }
    });
});
// ===============================
// Typing Effect
// ===============================

const typingElement = document.getElementById("typing");

if (typingElement) {
    const roles = [
        "BCA Student",
        "Web Developer",
        "AR/VR Enthusiast",
        
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentRole.length) {
            setTimeout(() => isDeleting = true, 1200);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect();
}
// ===============================
// Custom Cursor Movement
// ===============================

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

document.querySelectorAll("a, button").forEach(el => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});