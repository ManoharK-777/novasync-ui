document.addEventListener('DOMContentLoaded', () => {
    
    /* ==============================================
       0. PRELOADER ENGINE
       ============================================== */
    const preloader = document.getElementById('NOVASYNC-preloader');
    
    // Fallback in case load event fails
    const preloaderTimeout = setTimeout(() => {
        if (preloader && !preloader.classList.contains('fade-out')) {
            preloader.classList.add('fade-out');
        }
    }, 3000);

    window.addEventListener('load', () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('fade-out');
                clearTimeout(preloaderTimeout);
            }
        }, 2200); // Wait for the loading bar animation to complete
    });

    /* ==============================================
       1. CUSTOM CURSOR GLOW
       ============================================== */
    const cursor = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.width = '250px';
        cursor.style.height = '250px';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.width = '300px';
        cursor.style.height = '300px';
    });

    /* ==============================================
       2. PARTICLE GENERATOR (HERO)
       ============================================== */
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }

    const colors = ['#FFFFFF', '#E0FFFF', '#00E5FF']; // White, Pale Blue, Cyan

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Randomize size, position, duration, and color for a starfield effect
        const size = Math.random() * 3 + 1; // 1px to 4px
        const posX = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 20 + 20; // Slower float for stars
        const color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        particlesContainer.appendChild(particle);
    }

    /* ==============================================
       3.1 SHOOTING STARS ENGINE
       ============================================== */
    function createShootingStar() {
        const star = document.createElement('div');
        star.classList.add('shooting-star');
        
        // Spawn randomly along the entire top width of the screen
        const startX = Math.random() * window.innerWidth;
        const startY = -150; // Well above the screen to start dropping
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        
        const duration = 2000 + Math.random() * 2000; // 2s to 4s
        star.style.animation = `tail ${duration}ms ease-in-out forwards, shooting ${duration}ms ease-in-out forwards`;
        
        document.body.appendChild(star);
        
        // Cleanup after animation finishes
        setTimeout(() => {
            star.remove();
        }, duration + 100);
    }

    // Spawn shooting stars periodically
    setInterval(() => {
        createShootingStar();
    }, 1500);

    /* ==============================================
       3. 3D TILT EFFECT (VANILLA JS)
       ============================================== */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();
        
        // Calculate mouse position relative to card center
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (max 15 degrees)
        const rotateX = ((mouseY / (cardRect.height / 2)) * -15).toFixed(2);
        const rotateY = ((mouseX / (cardRect.width / 2)) * 15).toFixed(2);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function resetTilt() {
        this.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }

    /* ==============================================
       4. SCROLL REVEAL ANIMATIONS
       ============================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==============================================
       5. MAGNETIC BUTTON EFFECT
       ============================================== */
    const magneticWrappers = document.querySelectorAll('.magnetic-wrapper');

    magneticWrappers.forEach(wrapper => {
        const btn = wrapper.querySelector('.magnetic-btn');
        if (!btn) return;

        wrapper.addEventListener('mousemove', (e) => {
            const rect = wrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Move button towards mouse strongly
            btn.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
        });

        wrapper.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
            btn.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), background 0.3s, box-shadow 0.3s';
            setTimeout(() => {
                btn.style.transition = 'background 0.3s, box-shadow 0.3s';
            }, 500);
        });
        
        wrapper.addEventListener('mouseenter', () => {
            btn.style.transition = 'background 0.3s, box-shadow 0.3s';
        });
    });

    /* ==============================================
       6. LIVE WIDTH TRACKER
       ============================================== */
    const widthTracker = document.getElementById('viewport-width');
    
    function updateWidth() {
        if (widthTracker) {
            widthTracker.textContent = window.innerWidth;
        }
    }

    window.addEventListener('resize', updateWidth);
    updateWidth(); // Initial call

    /* ==============================================
       7. STATS COUNTER ANIMATION
       ============================================== */
    const statCounter = document.querySelector('.stats-counter');
    let hasCounted = false;

    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            animateCounter(statCounter, 0, 99.9, 2000);
            
            // Animate progress bar
            const progressBar = document.querySelector('.progress-fill');
            if(progressBar) {
                setTimeout(() => {
                    progressBar.style.width = '99.9%';
                }, 500);
            }
        }
    });

    if (statCounter) {
        statsObserver.observe(statCounter);
    }

    function animateCounter(el, start, end, duration) {
        let startTime = null;
        
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            
            // Easing function (easeOutQuart)
            const easeOut = 1 - Math.pow(1 - progress, 4);
            const currentVal = (progress * (end - start) + start).toFixed(1);
            
            el.textContent = currentVal;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                el.textContent = end;
            }
        };
        
        window.requestAnimationFrame(step);
    }

    /* ==============================================
       8. NAVBAR SCROLL EFFECT
       ============================================== */
    const navbar = document.querySelector('.glass-nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 5, 0.9)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 5, 0.7)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 0';
        }
    });

    /* ==============================================
       9. PREMIUM TOAST NOTIFICATIONS
       ============================================== */
    const toastElList = [].slice.call(document.querySelectorAll('.toast'));
    const toastList = toastElList.map(function (toastEl) {
        return new bootstrap.Toast(toastEl, { delay: 4000 });
    });

    const toastTriggers = document.querySelectorAll('.toast-trigger');
    const toastBody = document.querySelector('#premiumToast .toast-body');

    toastTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Generate custom messages based on text content
            let text = trigger.textContent.trim();
            if (text.length > 20 || text.length === 0) {
                text = "Action";
            }
            
            if (toastBody) {
                toastBody.innerHTML = `<span style="color: var(--primary);">[System]</span> ${text} module engaging...`;
            }
            
            if (toastList.length > 0) {
                toastList[0].show();
            }
        });
    });
});


// Force scroll to top on page refresh to ensure cinematic intro is seen
if (history.scrollRestoration) {
    history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

