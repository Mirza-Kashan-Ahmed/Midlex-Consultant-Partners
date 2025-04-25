// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Set header initial state to white
    header.style.background = '#ffffff';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';

    // Sticky Header effect - enhance shadow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav && nav.classList.contains('active') && !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
            nav.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Portfolio Filtering with animation
    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                // Show/hide portfolio items based on filter
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        // Add animation
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 200);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Testimonial Slider with fade effect
    let currentTestimonial = 0;
    
    // Hide all testimonials except the first one
    if (testimonialItems.length > 1) {
        for (let i = 1; i < testimonialItems.length; i++) {
            testimonialItems[i].style.display = 'none';
        }
    }
    
    // Function to show testimonial with better fade effect
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialItems.forEach(item => {
            item.style.opacity = 0;
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
        
        // Show current testimonial with delay for fade effect
        setTimeout(() => {
            testimonialItems[index].style.display = 'block';
            setTimeout(() => {
                testimonialItems[index].style.opacity = 1;
            }, 50);
        }, 300);
    }
    
    // Handle next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonialItems.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
    }
    
    // Handle previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonialItems.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
    }

    // Auto-slide testimonials
    let testimonialInterval = setInterval(function() {
        if (testimonialItems.length > 1) {
            currentTestimonial++;
            if (currentTestimonial >= testimonialItems.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }
    }, 5000);

    // Pause auto-slide on hover
    document.querySelector('.testimonial-slider').addEventListener('mouseenter', function() {
        clearInterval(testimonialInterval);
    });

    // Resume auto-slide when mouse leaves
    document.querySelector('.testimonial-slider').addEventListener('mouseleave', function() {
        testimonialInterval = setInterval(function() {
            if (testimonialItems.length > 1) {
                currentTestimonial++;
                if (currentTestimonial >= testimonialItems.length) {
                    currentTestimonial = 0;
                }
                showTestimonial(currentTestimonial);
            }
        }, 5000);
    });

    // Contact Form Validation with better feedback
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (subjectInput.value.trim() === '') {
                isValid = false;
                showError(subjectInput, 'Subject is required');
            } else {
                removeError(subjectInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            // If form is valid, send data
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Your message has been sent successfully!';
                successMessage.style.padding = '20px';
                successMessage.style.backgroundColor = 'var(--primary-color)';
                successMessage.style.color = '#fff';
                successMessage.style.borderRadius = '5px';
                successMessage.style.textAlign = 'center';
                successMessage.style.marginTop = '20px';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
                
                console.log('Form submitted successfully!');
            }
        });
    }
    
    // Newsletter Form with better feedback
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                // Show error
                emailInput.style.borderColor = 'var(--primary-color)';
                emailInput.style.backgroundColor = 'rgba(255, 107, 1, 0.1)';
            } else {
                // Success
                emailInput.style.borderColor = 'var(--primary-color)';
                emailInput.style.backgroundColor = 'rgba(255, 107, 1, 0.05)';
                emailInput.value = '';
                
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.style.backgroundColor = '';
                }, 3000);
            }
        });
    }
    
    // Helper Functions
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
        
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        errorMessage.style.color = 'var(--primary-color)';
        errorMessage.style.fontSize = '12px';
        errorMessage.style.marginTop = '5px';
        
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(errorMessage);
        }
        
        input.style.borderColor = 'var(--primary-color)';
        input.style.backgroundColor = 'rgba(255, 107, 1, 0.1)';
    }
    
    function removeError(input) {
        const formGroup = input.parentElement;
        const errorMessage = formGroup.querySelector('.error-message');
        
        if (errorMessage) {
            formGroup.removeChild(errorMessage);
        }
        
        input.style.borderColor = '';
        input.style.backgroundColor = '';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }



    // Add a reveal animation for sections when scrolling
    const revealElements = document.querySelectorAll('.section-header, .about-content, .services-grid, .portfolio-grid, .testimonial-slider, .contact-content');
    
    function revealOnScroll() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Initialize reveal styles
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Call on initial load and scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // Country Selector Functionality
    const countrySelector = document.getElementById('countrySelector');

    if (countrySelector) {
        // Set initial value based on browser language or stored preference
        const userLang = navigator.language || navigator.userLanguage;
        const storedCountry = localStorage.getItem('selectedCountry');
        
        if (storedCountry) {
            countrySelector.value = storedCountry;
        } else if (userLang) {
            // Try to match language code to a country
            const langCode = userLang.split('-')[0].toLowerCase();
            
            // Map language codes to country values in our selector
            const langToCountry = {
                'en': 'us', // Default English to US
                'fr': 'fr',
                'de': 'de',
                'ja': 'jp',
                'zh': 'cn',
                'hi': 'in',
                'pt': 'br'
            };
            
            if (langToCountry[langCode]) {
                countrySelector.value = langToCountry[langCode];
            }
            
            // Handle specific country codes if available (en-GB, en-US, etc.)
            if (userLang.toLowerCase().includes('gb') || userLang.toLowerCase().includes('uk')) {
                countrySelector.value = 'uk';
            } else if (userLang.toLowerCase().includes('ca')) {
                countrySelector.value = 'ca';
            } else if (userLang.toLowerCase().includes('au')) {
                countrySelector.value = 'au';
            }
        }
        
        // Store selection when changed
        countrySelector.addEventListener('change', function() {
            localStorage.setItem('selectedCountry', this.value);
            // In a real site, this might trigger a language change or redirect
            console.log(`Country changed to: ${this.value}`);
            
            // Example of showing feedback to user (in a real site, this could change the language)
            const successMessage = document.createElement('div');
            successMessage.className = 'country-change-message';
            successMessage.textContent = `Location updated to: ${this.options[this.selectedIndex].text}`;
            successMessage.style.position = 'fixed';
            successMessage.style.top = '100px';
            successMessage.style.left = '50%';
            successMessage.style.transform = 'translateX(-50%)';
            successMessage.style.backgroundColor = 'var(--primary-color)';
            successMessage.style.color = '#fff';
            successMessage.style.padding = '10px 20px';
            successMessage.style.borderRadius = '4px';
            successMessage.style.zIndex = '1001';
            successMessage.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
            
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 500);
            }, 3000);
        });
    }

    // Add click effect to navigation buttons
    document.querySelectorAll('nav ul li a').forEach(navLink => {
        navLink.addEventListener('click', function(e) {
            // Add ripple effect when clicked
            const ripple = document.createElement('span');
            ripple.className = 'nav-ripple';
            this.appendChild(ripple);
            
            // Position the ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size/2}px`;
            ripple.style.top = `${e.clientY - rect.top - size/2}px`;
            
            // Remove the ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    document.querySelectorAll('.floatLabel').forEach(input => {
        input.addEventListener('focus', () => {
          input.nextElementSibling.classList.add('active');
        });
        input.addEventListener('blur', () => {
          if (!input.value) {
            input.nextElementSibling.classList.remove('active');
          }
        });
      });    
}); 
