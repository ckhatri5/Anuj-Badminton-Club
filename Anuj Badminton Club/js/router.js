export const initRouter = () => {
    const handleRoute = () => {
        const hash = window.location.hash || '#home';
        const pageId = hash.substring(1);

        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            // Add hidden class for display:none
            page.style.display = 'none';
        });

        // Show active page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.style.display = 'block';
            setTimeout(() => activePage.classList.add('active'), 10); // Trigger fade in
        }

        // Update Nav
        document.querySelectorAll('.nav-item').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        // Close mobile menu if open
        const navLinks = document.getElementById('nav-links');
        if (navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
        }
    };

    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('load', handleRoute);
};
