// Mobile Menu Toggle
const hamburger = document.querySelector(".hamburger-menu");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Lazy loading for images
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy-load"));

    if ("IntersectionObserver" in window) {
        let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.add("loaded");
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});

// Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');

const revealElementOnScroll = function() {
    for (var i = 0; i < revealElements.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = revealElements[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", revealElementOnScroll);
revealElementOnScroll();

// New Testimonial Slider
const slider = document.querySelector('.testimonial-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const testimonials = document.querySelectorAll('.testimonial');
const dotsContainer = document.querySelector('.testimonial-dots');

let currentIndex = 0;

// Create dots
testimonials.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}

function goToSlide(index) {
    currentIndex = index;
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    updateDots();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    goToSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    goToSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);

// Form validation and submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Basic form validation
    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var phone = document.querySelector('input[name="phone"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    if (!name || !email || !phone || !message) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }

    // Show loading animation
    var submitButton = this.querySelector('button[type="submit"]');
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Simulate form submission (replace with actual AJAX call in production)
    setTimeout(() => {
        console.log('Form submitted:', { name, email, phone, message });
        showAlert('Thank you for your message. We will get back to you soon!', 'success');
        this.reset();
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;
    }, 2000);
});

// Helper function to show alert messages
function showAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}

// Sticky header
window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    const scrollPosition = window.pageYOffset;
    heroSection.style.backgroundPositionY = scrollPosition * 0.7 + 'px';
});