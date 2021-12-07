/* Navbar on scroll */
document.addEventListener('DOMContentLoaded', function() {
    const $navbar = document.querySelector('[data-component="navbar"]');

    if (!$navbar) {
        return false;
    }

    function navbarDeafultScroll() {
        let onScroll = function () {
            $navbar.classList.toggle(scrolledClass, window.scrollY > $navbar.offsetHeight);
        };

        onScroll();
        window.addEventListener('scroll', function() {
            onScroll();
        });
    }

    navbarDeafultScroll();
});