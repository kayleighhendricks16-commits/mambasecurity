// ===== MOBILE MENU - FIXED FOR ALL DEVICES =====
let isMenuOpen = false;
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const body = document.body;

// 1. FORCE INITIAL STATE - Menu closed on all devices
document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile Menu: DOM loaded - ensuring menu is closed');
    
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // CRITICAL: Force mobile menu to start closed
    if (mobileMenu) {
        mobileMenu.classList.remove('active');
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.webkitTransform = 'translateX(100%)';
        mobileMenu.style.visibility = 'hidden';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.display = 'none';
    }
    
    if (body) {
        body.classList.remove('menu-open', 'popup-open', 'cookie-open');
        body.style.overflow = 'auto';
        body.style.position = 'static';
    }
    
    if (hamburger) {
        hamburger.classList.remove('active');
    }
    
    // Force WhatsApp button visible
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.display = 'flex';
        whatsappFloat.style.visibility = 'visible';
        whatsappFloat.style.opacity = '1';
        whatsappFloat.style.zIndex = '9999';
    }
    
    // Set black backgrounds
    document.body.style.backgroundColor = '#000000';
    const hero = document.querySelector('.hero');
    if (hero) hero.style.backgroundColor = '#000000';
});

// 2. HAMBURGER CLICK HANDLER - SIMPLE & RELIABLE
if (hamburger) {
    // Remove any existing event listeners first
    const newHamburger = hamburger.cloneNode(true);
    hamburger.parentNode.replaceChild(newHamburger, hamburger);
    
    // Get the new hamburger element
    const freshHamburger = document.getElementById('hamburger');
    
    freshHamburger.addEventListener('click', function(e) {
        console.log('Hamburger clicked - isMenuOpen:', isMenuOpen);
        e.stopPropagation(); // Prevent event from bubbling up
        
        // Check if popup is open - don't open menu if it is
        const popupOverlay = document.getElementById('popupOverlay');
        if (popupOverlay && popupOverlay.classList.contains('active')) {
            console.log('Popup is open, not opening menu');
            return;
        }
        
        if (!isMenuOpen) {
            // OPEN MENU
            console.log('Opening mobile menu');
            openMobileMenu();
        } else {
            // CLOSE MENU
            console.log('Closing mobile menu');
            closeMobileMenu();
        }
    });
}

// 3. OPEN MOBILE MENU FUNCTION
function openMobileMenu() {
    console.log('openMobileMenu called');
    isMenuOpen = true;
    
    if (mobileMenu) {
        // First make it visible but off-screen
        mobileMenu.style.display = 'block';
        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.webkitTransform = 'translateX(100%)';
        
        // Force reflow
        mobileMenu.offsetHeight;
        
        // Then animate it in
        setTimeout(() => {
            mobileMenu.classList.add('active');
            mobileMenu.style.opacity = '1';
            mobileMenu.style.transform = 'translateX(0)';
            mobileMenu.style.webkitTransform = 'translateX(0)';
        }, 10);
    }
    
    if (body) {
        body.classList.add('menu-open');
        body.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.width = '100%';
        body.style.height = '100%';
    }
    
    if (hamburger) {
        hamburger.classList.add('active');
    }
    
    // Hide WhatsApp float when menu is open
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        whatsappFloat.style.display = 'none';
    }
    
    console.log('Menu opened successfully');
}

// 4. CLOSE MOBILE MENU FUNCTION
function closeMobileMenu() {
    console.log('closeMobileMenu called');
    isMenuOpen = false;
    
    if (mobileMenu) {
        // Animate out
        mobileMenu.style.opacity = '0';
        mobileMenu.style.transform = 'translateX(100%)';
        mobileMenu.style.webkitTransform = 'translateX(100%)';
        
        // Remove active class after animation
        setTimeout(() => {
            mobileMenu.classList.remove('active');
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.style.display = 'none';
        }, 300); // Match CSS transition time
    }
    
    if (body) {
        body.classList.remove('menu-open');
        body.style.overflow = 'auto';
        body.style.position = 'static';
        body.style.width = 'auto';
        body.style.height = 'auto';
    }
    
    if (hamburger) {
        hamburger.classList.remove('active');
    }
    
    // Show WhatsApp float after menu closes
    setTimeout(() => {
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) {
            whatsappFloat.style.display = 'flex';
            whatsappFloat.style.visibility = 'visible';
            whatsappFloat.style.opacity = '1';
        }
    }, 350);
    
    console.log('Menu closed successfully');
}

// 5. CLOSE MENU WHEN CLICKING MOBILE LINKS
document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function(e) {
        console.log('Mobile link clicked, closing menu');
        e.stopPropagation();
        closeMobileMenu();
        
        // If it's an anchor link, scroll after closing menu
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            setTimeout(() => {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 400);
        }
    });
});

// 6. CLOSE MENU WHEN CLICKING OUTSIDE
document.addEventListener('click', function(e) {
    if (!isMenuOpen) return;
    
    // Check if click is inside menu or on hamburger
    const isClickInsideMenu = mobileMenu && mobileMenu.contains(e.target);
    const isClickOnHamburger = hamburger && hamburger.contains(e.target);
    
    // If click is outside menu AND not on hamburger, close menu
    if (!isClickInsideMenu && !isClickOnHamburger) {
        console.log('Clicked outside menu, closing it');
        closeMobileMenu();
    }
});

// 7. CLOSE MENU WITH ESCAPE KEY
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && isMenuOpen) {
        console.log('Escape key pressed, closing menu');
        closeMobileMenu();
    }
});

// 8. DOUBLE-CHECK MENU IS CLOSED ON PAGE LOAD
window.addEventListener('load', function() {
    console.log('Page fully loaded - final menu check');
    
    // Extra safety: ensure menu is closed
    setTimeout(() => {
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
            mobileMenu.style.transform = 'translateX(100%)';
            mobileMenu.style.webkitTransform = 'translateX(100%)';
            mobileMenu.style.visibility = 'hidden';
            mobileMenu.style.opacity = '0';
            mobileMenu.style.display = 'none';
        }
        
        if (body) {
            body.classList.remove('menu-open');
            body.style.overflow = 'auto';
            body.style.position = 'static';
        }
        
        if (hamburger) {
            hamburger.classList.remove('active');
        }
        
        console.log('Final menu state: CLOSED');
    }, 100);
});

// 9. HERO SLIDER
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
    
    showHeroSlide(0);
    startHeroSlider();
    
    // Pause slider when user hovers over it
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopHeroSlider);
        heroSlider.addEventListener('mouseleave', startHeroSlider);
    }
}

// 10. TESTIMONIALS SLIDER
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
    
    // Adjust on window resize
    window.addEventListener('resize', updateTestimonialSlider);
    
    // Initialize
    updateTestimonialSlider();
}

// 11. FAQ TOGGLE
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

// 12. POPUP MODAL
const popupClose = document.getElementById('popupClose');
const newsletterForm = document.getElementById('newsletterForm');
const popupOverlay = document.getElementById('popupOverlay');

function showPopup() {
    // Close mobile menu first if open
    if (isMenuOpen) {
        closeMobileMenu();
    }
    
    setTimeout(() => {
        if (popupOverlay) {
            popupOverlay.classList.add('active');
            body.classList.add('popup-open');
            
            // Disable hamburger when popup is open
            if (hamburger) hamburger.style.pointerEvents = 'none';
            
            // Hide WhatsApp float when popup is open
            const whatsappFloat = document.querySelector('.whatsapp-float');
            if (whatsappFloat) whatsappFloat.style.display = 'none';
        }
    }, 3000);
}

function hidePopup() {
    if (popupOverlay) {
        popupOverlay.classList.remove('active');
        body.classList.remove('popup-open');
    }
    
    // Re-enable hamburger
    if (hamburger) hamburger.style.pointerEvents = 'auto';
    
    // Show WhatsApp float after popup closes
    setTimeout(() => {
        const whatsappFloat = document.querySelector('.whatsapp-float');
        if (whatsappFloat) whatsappFloat.style.display = 'flex';
    }, 300);
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
                setTimeout(() => {
                    emailInput.style.borderColor = '';
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

// 13. COOKIE CONSENT
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

// 14. ANIMATIONS ON SCROLL
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

// Check on scroll and on load
window.addEventListener('scroll', checkFloatUp);
setTimeout(checkFloatUp, 300);
window.addEventListener('load', checkFloatUp);

// 15. HEADER SCROLL EFFECT
let lastScrollTop = 0;
const header = document.querySelector('.header');

if (header) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
}

// 16. SMOOTH SCROLL FOR ANCHOR LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        // Don't prevent default for #home - let it scroll naturally
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
            
            // Close mobile menu if open
            if (isMenuOpen) {
                closeMobileMenu();
            }
        }
    });
});

// 17. IMAGE LAZY LOADING
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

// 18. WHATSAPP BUTTON PULSE ANIMATION
const whatsappBtn = document.querySelector('.whatsapp-float');
if (whatsappBtn) {
    // Remove any existing animation
    whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite';
    
    // Add pulse animation every 8 seconds
    setInterval(() => {
        whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite, pulseWhatsApp 2s infinite';
        setTimeout(() => {
            whatsappBtn.style.animation = 'floatWhatsApp 3s ease-in-out infinite';
        }, 2000);
    }, 8000);
}

// 19. SERVICE CARDS HOVER EFFECT (for desktop only)
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

// 20. TOUCH DEVICE OPTIMIZATION
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add('touch-device');
    
    // Increase touch targets for better mobile UX
    document.querySelectorAll('.btn, .mobile-link').forEach(element => {
        element.style.minHeight = '44px';
        element.style.minWidth = '44px';
    });
}

// 21. REDUCED MOTION PREFERENCE
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

// 22. CONSOLE GREETING
console.log('Mamba Security website loaded successfully');
console.log('Mobile Menu: Script loaded - hamburger menu should work on all devices');