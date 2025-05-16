const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinksMobile = document.querySelectorAll('#mobile-menu a'); // Get all links in mobile menu

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
            mobileMenuButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `; 
        } else {
            mobileMenuButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            `; 
        }
    });

    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                 mobileMenuButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                `;
            }
        });
    });
} 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const isMobileNavLink = this.closest('#mobile-menu') !== null;
        const isDesktopNavLink = this.closest('#header .nav-links') !== null || this.closest('#header .btn-nav') !== null;
        
        if (this.getAttribute('href') !== '#' && (isMobileNavLink || isDesktopNavLink || this.closest('.hero-section'))) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                let elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                if (targetId === "#hero") {
                     offsetPosition = elementPosition + window.pageYOffset;
                }

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    });
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) { // Adjust 50 to your preferred scroll distance
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
