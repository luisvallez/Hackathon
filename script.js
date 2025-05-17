const mobileMenuButton = document.getElementById("mobile-menu-button");
      const mobileMenu = document.getElementById("mobile-menu");
      const navLinksMobile = document.querySelectorAll("#mobile-menu a");

      if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
          const isExpanded = mobileMenu.classList.toggle("hidden");
          mobileMenuButton.setAttribute("aria-expanded", !isExpanded);
          // Change burger icon to X and vice-versa
          if (!isExpanded) {
            // Menu is open
            mobileMenuButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>`;
          } else {
            // Menu is closed
            mobileMenuButton.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>`;
          }
        });

        // Close mobile menu when a link is clicked
        navLinksMobile.forEach((link) => {
          link.addEventListener("click", () => {
            if (!mobileMenu.classList.contains("hidden")) {
              mobileMenu.classList.add("hidden");
              mobileMenuButton.setAttribute("aria-expanded", "false");
              mobileMenuButton.innerHTML = `
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>`;
            }
          });
        });
      }

      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          const href = this.getAttribute("href");
          // Ensure it's a valid anchor link and not just "#"
          if (href && href.startsWith("#") && href.length > 1) {
            const targetElement = document.querySelector(href);
            if (targetElement) {
              e.preventDefault();
              const header = document.getElementById("header");
              const headerHeight = header ? header.offsetHeight : 0;
              let elementPosition = targetElement.getBoundingClientRect().top;
              let offsetPosition =
                elementPosition + window.pageYOffset - headerHeight;

              // Special case for hero to scroll to very top
              if (href === "#hero") {
                offsetPosition = elementPosition + window.pageYOffset; // No header offset for hero
              }

              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }
          } else if (href === "#") {
            // Prevent default for "#" links
            e.preventDefault();
          }
        });
      });

      // Header scroll effect
      window.addEventListener("scroll", function () {
        const header = document.getElementById("header");
        if (window.scrollY > 50) {
          header.classList.add("header-scrolled");
        } else {
          header.classList.remove("header-scrolled");
        }
      });