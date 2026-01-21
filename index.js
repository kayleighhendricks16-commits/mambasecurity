// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;
const whatsappFloat = document.querySelector('.whatsapp-float');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
        hamburger.classList.toggle('active');
        
        // Hide/show WhatsApp button
        if (mobileMenu.classList.contains('active')) {
            if (whatsappFloat) whatsappFloat.style.display = 'none';
        } else {
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && 
            !hamburger.contains(e.target) && 
            mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            hamburger.classList.remove('active');
            if (whatsappFloat) whatsappFloat.style.display = 'flex';
        }
    });
    
    // Close mobile menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                body.classList.remove('menu-open');
                hamburger.classList.remove('active');
                if (whatsappFloat) whatsappFloat.style.display = 'flex';
            }
        }
    });
}

// Set current year in footer
if (document.getElementById('currentYear')) {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// ===== HEADER SCROLL EFFECT =====
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ===== HERO SLIDER =====
const heroSlides = document.querySelectorAll('.slide');
const heroPrevBtn = document.querySelector('.hero-prev');
const heroNextBtn = document.querySelector('.hero-next');
const heroDots = document.querySelectorAll('.hero-dot');

if (heroSlides.length > 0) {
    let heroCurrentSlide = 0;
    let heroInterval = null;
    const HERO_DELAY = 5000;
    
    function showHeroSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '2' : '0';
        });
        
        heroDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        heroCurrentSlide = index;
    }
    
    function nextHeroSlide() {
        const next = (heroCurrentSlide + 1) % heroSlides.length;
        showHeroSlide(next);
    }
    
    function prevHeroSlide() {
        const prev = (heroCurrentSlide - 1 + heroSlides.length) % heroSlides.length;
        showHeroSlide(prev);
    }
    
    function startHeroSlider() {
        if (heroInterval) clearInterval(heroInterval);
        heroInterval = setInterval(nextHeroSlide, HERO_DELAY);
    }
    
    function stopHeroSlider() {
        if (heroInterval) {
            clearInterval(heroInterval);
            heroInterval = null;
        }
    }
    
    if (heroNextBtn) {
        heroNextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopHeroSlider();
            nextHeroSlide();
            startHeroSlider();
        });
    }
    
    if (heroPrevBtn) {
        heroPrevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            stopHeroSlider();
            prevHeroSlide();
            startHeroSlider();
        });
    }
    
    heroDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            stopHeroSlider();
            showHeroSlide(i);
            startHeroSlider();
        });
    });
    
    // Initialize
    showHeroSlide(0);
    startHeroSlider();
    
    // Pause on hover
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopHeroSlider);
        heroSlider.addEventListener('mouseleave', startHeroSlider);
    }
}

// ===== TESTIMONIALS SLIDER =====
const testimonialsTrack = document.querySelector('.testimonials-track');
const testimonialItems = document.querySelectorAll('.testimonial-item');
const testimonialPrevBtn = document.querySelector('.slider-prev');
const testimonialNextBtn = document.querySelector('.slider-next');

if (testimonialsTrack && testimonialItems.length > 0) {
    let testimonialCurrentIndex = 0;
    const totalTestimonialItems = testimonialItems.length;
    
    function updateTestimonialSlider() {
        const itemsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
        const maxIndex = Math.max(0, totalTestimonialItems - itemsPerView);
        testimonialCurrentIndex = Math.min(testimonialCurrentIndex, maxIndex);
        
        const translateX = -testimonialCurrentIndex * (100 / itemsPerView);
        testimonialsTrack.style.transform = `translateX(${translateX}%)`;
        testimonialsTrack.style.transition = 'transform 0.5s ease';
    }
    
    if (testimonialNextBtn) {
        testimonialNextBtn.addEventListener('click', () => {
            const itemsPerView = window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3;
            const maxIndex = Math.max(0, totalTestimonialItems - itemsPerView);
            
            if (testimonialCurrentIndex < maxIndex) {
                testimonialCurrentIndex++;
                updateTestimonialSlider();
            }
        });
    }
    
    if (testimonialPrevBtn) {
        testimonialPrevBtn.addEventListener('click', () => {
            if (testimonialCurrentIndex > 0) {
                testimonialCurrentIndex--;
                updateTestimonialSlider();
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', updateTestimonialSlider);
    
    // Initialize
    updateTestimonialSlider();
}

// ===== FAQ TOGGLE =====
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
        
        // Update toggle icon
        const toggleIcon = question.querySelector('.faq-toggle');
        if (toggleIcon) {
            toggleIcon.textContent = isActive ? '+' : '×';
        }
    });
});

// ===== POPUP MODAL =====
const popupClose = document.getElementById('popupClose');
const newsletterForm = document.getElementById('newsletterForm');
const popupOverlay = document.getElementById('popupOverlay');

function showPopup() {
    // Close mobile menu first if open
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        if (hamburger) hamburger.classList.remove('active');
        if (whatsappFloat) whatsappFloat.style.display = 'flex';
    }
    
    setTimeout(() => {
        if (popupOverlay) {
            popupOverlay.classList.add('active');
            body.classList.add('popup-open');
        }
    }, 3000);
}

function hidePopup() {
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
        body.classList.remove('popup-open');
    }
}

if (popupClose) {
    popupClose.addEventListener('click', hidePopup);
}

if (popupOverlay) {
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) hidePopup();
    });
}

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('popupEmail');
        const email = emailInput ? emailInput.value : '';
        
        if (email && email.includes('@')) {
            newsletterForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle"></i>
                    <h3>Welcome to the Tribe!</h3>
                    <p>Thank you for subscribing to our security newsletter.</p>
                    <p>You'll receive your first update soon.</p>
                </div>
            `;
            
            setTimeout(hidePopup, 3000);
        } else {
            // Show error
            if (emailInput) {
                emailInput.style.borderColor = '#ff3b30';
                emailInput.placeholder = 'Please enter a valid email';
                setTimeout(() => {
                    emailInput.style.borderColor = '';
                    emailInput.placeholder = 'Your Email Address';
                }, 2000);
            }
        }
    });
}

// Show popup after delay (only once per session)
if (!sessionStorage.getItem('popupShown')) {
    setTimeout(showPopup, 5000);
    sessionStorage.setItem('popupShown', 'true');
}

// ===== COOKIE CONSENT =====
const cookieAcceptAll = document.getElementById('cookieAcceptAll');
const cookieCustomize = document.getElementById('cookieCustomize');
const cookieDecline = document.getElementById('cookieDecline');
const cookieSettingsClose = document.getElementById('cookieSettingsClose');
const cookieSaveSettings = document.getElementById('cookieSaveSettings');
const cookieAcceptAllSettings = document.querySelector('.cookie-accept-all-settings');
const cookieConsentOverlay = document.getElementById('cookieConsentOverlay');
const cookieSettingsModal = document.getElementById('cookieSettingsModal');

// Show cookie consent after 2 seconds if not already accepted
setTimeout(() => {
    if (!localStorage.getItem('cookiesAccepted') && cookieConsentOverlay) {
        cookieConsentOverlay.classList.add('active');
    }
}, 2000);

// Accept All Cookies
if (cookieAcceptAll) {
    cookieAcceptAll.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'all');
        localStorage.setItem('analyticsCookies', 'true');
        localStorage.setItem('marketingCookies', 'true');
        
        if (cookieConsentOverlay) {
            cookieConsentOverlay.classList.remove('active');
        }
    });
}

// Customize Settings
if (cookieCustomize) {
    cookieCustomize.addEventListener('click', () => {
        if (cookieSettingsModal) {
            cookieSettingsModal.classList.add('active');
        }
    });
}

// Decline Cookies
if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'none');
        
        if (cookieConsentOverlay) {
            cookieConsentOverlay.classList.remove('active');
        }
    });
}

// Close Settings Modal
if (cookieSettingsClose) {
    cookieSettingsClose.addEventListener('click', () => {
        if (cookieSettingsModal) {
            cookieSettingsModal.classList.remove('active');
        }
    });
}

// Save Cookie Settings
if (cookieSaveSettings) {
    cookieSaveSettings.addEventListener('click', () => {
        const analytics = document.getElementById('analyticsCookies') ? document.getElementById('analyticsCookies').checked : true;
        const marketing = document.getElementById('marketingCookies') ? document.getElementById('marketingCookies').checked : true;
        
        localStorage.setItem('cookiesAccepted', 'custom');
        localStorage.setItem('analyticsCookies', analytics);
        localStorage.setItem('marketingCookies', marketing);
        
        if (cookieSettingsModal) {
            cookieSettingsModal.classList.remove('active');
        }
        
        if (cookieConsentOverlay) {
            cookieConsentOverlay.classList.remove('active');
        }
    });
}

// Accept All from Settings
if (cookieAcceptAllSettings) {
    cookieAcceptAllSettings.addEventListener('click', () => {
        localStorage.setItem('cookiesAccepted', 'all');
        localStorage.setItem('analyticsCookies', 'true');
        localStorage.setItem('marketingCookies', 'true');
        
        if (cookieSettingsModal) {
            cookieSettingsModal.classList.remove('active');
        }
        
        if (cookieConsentOverlay) {
            cookieConsentOverlay.classList.remove('active');
        }
    });
}

// Close cookie modal when clicking outside
if (cookieConsentOverlay) {
    cookieConsentOverlay.addEventListener('click', (e) => {
        if (e.target === cookieConsentOverlay && cookieSettingsModal && !cookieSettingsModal.contains(e.target)) {
            cookieConsentOverlay.classList.remove('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
const floatUpElements = document.querySelectorAll('.float-up');

function checkFloatUp() {
    floatUpElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize float-up elements
floatUpElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

// Check on scroll and load
window.addEventListener('scroll', checkFloatUp);
setTimeout(checkFloatUp, 300);
window.addEventListener('load', checkFloatUp);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        // Don't prevent default for #home
        if (href !== '#home') {
            e.preventDefault();
        }
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerHeight = document.querySelector('.header') ? document.querySelector('.header').offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== IMAGE LAZY LOADING =====
const images = document.querySelectorAll('img[loading="lazy"]');
if ('IntersectionObserver' in window && images.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== WHATSAPP BUTTON ANIMATIONS =====
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    // Initial animation
    whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite';
    
    // Add pulse animation every 8 seconds
    setInterval(() => {
        whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite, pulseWhatsApp 2s infinite';
        setTimeout(() => {
            whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite';
        }, 2000);
    }, 8000);
}

// ===== SERVICE CARDS HOVER EFFECT (Desktop only) =====
if (window.innerWidth > 768) {
    const serviceCards = document.querySelectorAll('.detailed-service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(153, 255, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 25px rgba(153, 255, 0, 0.2)';
        });
    });
}

// ===== TOUCH DEVICE OPTIMIZATION =====
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Increase touch targets for better mobile UX
    document.querySelectorAll('.btn, .mobile-link').forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
}

// ===== REDUCED MOTION PREFERENCE =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Stop all animations
    document.querySelectorAll('*').forEach(element => {
        element.style.animationDuration = '0.01ms !important';
        element.style.animationIterationCount = '1 !important';
        element.style.transitionDuration = '0.01ms !important';
    });
    
    // Stop hero slider autoplay
    if (typeof stopHeroSlider === 'function') {
        stopHeroSlider();
    }
}

// ===== RESIZE HANDLER =====
window.addEventListener('resize', function() {
    // Close mobile menu if window gets too large
    if (window.innerWidth > 1024 && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        body.classList.remove('menu-open');
        if (hamburger) hamburger.classList.remove('active');
        if (whatsappFloat) whatsappFloat.style.display = 'flex';
    }
});

// ===== INITIALIZE ON LOAD =====
window.addEventListener('load', function() {
    console.log('Mamba Security website loaded successfully');
    
    // Ensure WhatsApp button is visible
    if (whatsappFloat) {
        whatsappFloat.style.display = 'flex';
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.visibility = 'visible';
    }
    
    // Initial float-up check
    setTimeout(checkFloatUp, 100);
});
