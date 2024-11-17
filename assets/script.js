
document.addEventListener('DOMContentLoaded', function() {
    const smoothScroll = function(target, duration) {
        if (!target) return;
        
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (!targetId) return;
            
            const target = document.getElementById(targetId);
            if (target) {
                smoothScroll(target, 1000);
            }
        });
    });

    const handleParallax = () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header) {
            requestAnimationFrame(() => {
                header.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
            });
        }
    };

    const handleScrollAnimations = () => {
        const elements = document.querySelectorAll('.chapter');
        const windowHeight = window.innerHeight;

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleParallax();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    });

    handleScrollAnimations();
});
