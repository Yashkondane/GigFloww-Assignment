
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuToggle.classList.toggle('active');
});

    // Mobile Dropdown Toggle
    const dropdownBtn = document.querySelector('.dropdown-btn');
    const dropdown = document.querySelector('.dropdown');

    if (window.innerWidth <= 768) {
    dropdownBtn.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('dropdown-active');
    });
}

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('nav-active')) {
                navLinks.classList.remove('nav-active');
                menuToggle.classList.remove('active');
            }

            // Smooth scroll to target
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

    // Animate Feature Cards on Scroll
    const featureCards = document.querySelectorAll('.feature-card');

    // Function to check if element is in viewport
    function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
    );
}

    // Function to add animation class to elements in viewport
    function animateOnScroll() {
    featureCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate-fadeInUp');
        }
    });
}

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    window.addEventListener('load', animateOnScroll);

    // Modal Functionality - Enhanced Transitions
    const modal = document.getElementById('signup-modal');
    const joinNowBtn = document.getElementById('join-now-btn');
    const ctaJoinBtn = document.getElementById('cta-join-btn');
    const closeModal = document.querySelector('.close-modal');
    const signupForm = document.getElementById('signup-form');
    const signupFormContainer = document.getElementById('signup-form-container');
    const thankYouMessage = document.getElementById('thank-you-message');
    const closeThankYou = document.getElementById('close-thank-you');

    // Open modal with smooth animation when Join Now button is clicked
    function openModal() {
    modal.style.display = 'flex';
    // Trigger reflow
    void modal.offsetWidth;
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

    joinNowBtn.addEventListener('click', openModal);
    ctaJoinBtn.addEventListener('click', openModal);

    // Close modal with smooth animation
    function closeModalWithAnimation() {
    modal.classList.remove('show');
    setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}, 400); // Match the transition duration
}

    // Close modal when X is clicked
    closeModal.addEventListener('click', closeModalWithAnimation);

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
    if (e.target === modal) {
    closeModalWithAnimation();
}
});

    // Close thank you message and modal with smooth transition
    closeThankYou.addEventListener('click', () => {
    thankYouMessage.classList.remove('show');

    setTimeout(() => {
    closeModalWithAnimation();

    // Reset form after closing with delay to ensure it happens after modal is hidden
    setTimeout(() => {
    thankYouMessage.style.display = 'none';
    signupFormContainer.style.display = 'block';
    signupForm.reset();
}, 400);
}, 300);
});

    // Form Validation with smooth error transitions
    signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;

    // Validate Name
    const name = document.getElementById('name');
    const nameError = document.getElementById('name-error');
    if (name.value.trim() === '') {
    nameError.classList.add('show');
    isValid = false;
} else {
    nameError.classList.remove('show');
}

    // Validate Email
    const email = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
    emailError.classList.add('show');
    isValid = false;
} else {
    emailError.classList.remove('show');
}

    // Validate Skill Category
    const skill = document.getElementById('skill');
    const skillError = document.getElementById('skill-error');
    if (skill.value === '') {
    skillError.classList.add('show');
    isValid = false;
} else {
    skillError.classList.remove('show');
}

    // Validate Portfolio URL (if provided)
    const portfolio = document.getElementById('portfolio');
    const portfolioError = document.getElementById('portfolio-error');
    if (portfolio.value !== '') {
    try {
    new URL(portfolio.value);
    portfolioError.classList.remove('show');
} catch (err) {
    portfolioError.classList.add('show');
    isValid = false;
}
}

    // If form is valid, show thank you message with smooth transition
    if (isValid) {
    // Fade out the form
    signupFormContainer.style.opacity = '0';
    signupFormContainer.style.transform = 'translateY(-20px)';

    setTimeout(() => {
    signupFormContainer.style.display = 'none';
    thankYouMessage.style.display = 'block';

    // Trigger reflow
    void thankYouMessage.offsetWidth;

    // Fade in the thank you message
    thankYouMessage.classList.add('show');
}, 300);

    // You would typically send the form data to a server here
    console.log('Form submitted with data:', {
    name: name.value,
    email: email.value,
    skill: skill.value,
    portfolio: portfolio.value
});
}
});

    // CTA Button Animation
    const ctaButtons = document.querySelectorAll('.cta-button');

    ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.classList.add('pulse');

        setTimeout(() => {
            button.classList.remove('pulse');
        }, 300);
    });
});

    // Window resize handler for dropdown
    window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
    // Reset dropdown behavior for desktop
    if (dropdown.classList.contains('dropdown-active')) {
    dropdown.classList.remove('dropdown-active');
}

    // Remove any click event listeners (this is simplified)
    dropdownBtn.onclick = null;
} else {
    // Re-add mobile dropdown behavior
    dropdownBtn.addEventListener('click', (e) => {
    e.preventDefault();
    dropdown.classList.toggle('dropdown-active');
});
}
});
