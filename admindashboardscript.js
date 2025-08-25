document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetPageId = item.getAttribute('data-page');

            pages.forEach(page => page.classList.remove('active-page'));

            const targetPage = document.getElementById(`${targetPageId}-page`);
            if (targetPage) {
                targetPage.classList.add('active-page');
            }
        });
    });

    const initialHash = window.location.hash.substring(1);
    let defaultPage = 'hero'; // Changed default to 'hero'

    if (initialHash) {
        const correspondingNavItem = document.querySelector(`.nav-item[data-page="${initialHash}"]`);
        if (correspondingNavItem) {
            defaultPage = initialHash;
        }
    }

    document.querySelector(`.nav-item[data-page="${defaultPage}"]`).classList.add('active');
    document.getElementById(`${defaultPage}-page`).classList.add('active-page');
});