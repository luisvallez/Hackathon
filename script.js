// script.js

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const navLinksMobile = document.querySelectorAll('#mobile-menu a'); // Get all links in mobile menu

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // ARIA attribute for accessibility
        const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
        mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        if (!isExpanded) {
            mobileMenuButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            `; // Change to X icon
        } else {
            mobileMenuButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            `; // Change back to hamburger icon
        }
    });

    // Close mobile menu when a link is clicked
    navLinksMobile.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
                 mobileMenuButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                `; // Reset to hamburger icon
            }
        });
    });

} else {
    console.warn("Mobile menu button or menu element not found.");
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Check if it's a nav link within the mobile menu or desktop nav
        const isMobileNavLink = this.closest('#mobile-menu') !== null;
        const isDesktopNavLink = this.closest('#header .nav-links') !== null || this.closest('#header .btn-nav') !== null;
        
        // Only apply smooth scroll to actual page anchors, not the "#" placeholder for the logo or participate button if it's not an anchor.
        if (this.getAttribute('href') !== '#' && (isMobileNavLink || isDesktopNavLink || this.closest('.hero-section'))) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height to offset scroll position
                const header = document.getElementById('header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                let elementPosition = targetElement.getBoundingClientRect().top;
                let offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                // If the target is the very first section (like #about from hero)
                // and the header is sticky, the offset might be slightly different.
                // For simplicity, this basic offset should work for most cases.
                // If the target is the hero section itself (e.g. from a "Back to Top" button), no offset needed.
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

// Optional: Add a scroll event listener to make the header smaller or change style on scroll
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) { // Adjust 50 to your preferred scroll distance
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add this to your style.css for the scrolled header effect (optional)
/*
#header.scrolled {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1); // Slightly more pronounced shadow
    transition: padding 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}
#header.scrolled .logo {
    font-size: 1.25rem; // Slightly smaller logo
    transition: font-size 0.3s ease-in-out;
}
*/

console.log("Impulso Digital script loaded successfully!");
