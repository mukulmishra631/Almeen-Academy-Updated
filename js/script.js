// ============ Mobile Menu Toggle ============
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        // Toggle menu on button click
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove("active");
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove("active");
            }
        });
    }

    // Scroll Animations
    const sections = document.querySelectorAll("section.animate");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
            } else {
                entry.target.classList.remove("in-view");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });
});

// ============ Image Carousel ============
let currentSlide = 0;

const slides = document.querySelectorAll('.carousel-slide');
const dotsContainer = document.getElementById('carousel-dots');

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    slides.forEach(slide => slide.style.display = 'none');
    dotsContainer.querySelectorAll('span').forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === currentSlide) dot.classList.add('active');
    });

    slides[currentSlide].style.display = 'block';
}

function moveSlide(step) {
    showSlide(currentSlide += step);
}

function createDots() {
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => {
            showSlide(i);
        });
        dotsContainer.appendChild(dot);
    });
    if (dotsContainer.children.length > 0) {
        dotsContainer.children[0].classList.add('active');
    }
}

function autoSlide() {
    setInterval(() => {
        moveSlide(1);
    }, 4000); // Change image every 4 seconds
}

document.addEventListener("DOMContentLoaded", function () {
    createDots();
    showSlide(currentSlide);
    autoSlide();
});

// ============ About Page Image Carousel ============
let currentAboutSlide = 0;

const aboutSlides = document.querySelectorAll('.about-carousel .carousel-slide');
const aboutDotsContainer = document.querySelector('.about-carousel .carousel-dots');

function showAboutSlide(index) {
    aboutSlides.forEach(slide => slide.classList.remove('active'));
    aboutDotsContainer.querySelectorAll('span').forEach((dot, i) => dot.classList.remove('active'));

    if (index >= aboutSlides.length) {
        currentAboutSlide = 0;
    } else if (index < 0) {
        currentAboutSlide = aboutSlides.length - 1;
    } else {
        currentAboutSlide = index;
    }

    aboutSlides[currentAboutSlide].classList.add('active');
    aboutDotsContainer.querySelectorAll('span')[currentAboutSlide].classList.add('active');
}

function plusSlides(step) {
    showAboutSlide(currentAboutSlide += step);
}

function createAboutDots() {
    aboutSlides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => showAboutSlide(i));
        aboutDotsContainer.appendChild(dot);
    });
    if (aboutDotsContainer.children.length > 0) {
        aboutDotsContainer.children[0].classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Initialize About Page Carousel
    if (aboutSlides.length > 0 && aboutDotsContainer) {
        createAboutDots();
        showAboutSlide(currentAboutSlide);

        // Optional: Auto Slide
        setInterval(() => {
            plusSlides(1);
        }, 4000); // Change every 4 seconds
    }
});