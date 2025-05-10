// Auto Slide
let autoSlideInterval;

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        plusSlides(1);
    }, 4000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize carousel
    if (slides.length > 0 && dotsContainer) {
        createDots();
        showSlide(currentSlide);
        startAutoSlide();

        // Pause on hover
        const container = document.querySelector(".carousel-container");
        if (container) {
            container.addEventListener("mouseenter", stopAutoSlide);
            container.addEventListener("mouseleave", startAutoSlide);
        }

        // Touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        container.addEventListener("touchstart", e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        container.addEventListener("touchend", e => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX > touchEndX + 50) {
                plusSlides(1); // Swipe Left → Next Slide
            } else if (touchStartX < touchEndX - 50) {
                plusSlides(-1); // Swipe Right → Prev Slide
            }
        });

        // Keyboard Navigation
        document.addEventListener("keydown", e => {
            if (e.key === "ArrowLeft") plusSlides(-1);
            if (e.key === "ArrowRight") plusSlides(1);
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove("active");
            });
        });
    }

    // Scroll Animations
    const heroSection = document.querySelector(".hero");

    if (heroSection) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("in-view");
            });
        }, { threshold: 0.2 });

        observer.observe(heroSection);
    }
});