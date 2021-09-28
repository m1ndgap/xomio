/* Menu */
let $menu = $('[data-component="menu"]');
let $menuToggle = $('[data-element="menu-toggle"]');

function hideMenu() {
    $menu.removeClass(visibleClass);
    $menuToggle.removeClass(activeClass);
    $body.removeClass(menuVisibleClass);
    $body.removeClass(lockedScrollClass);
}

function showMenu() {
    if ($(window).width() < bpXL) {
        $menu.addClass(visibleClass);
        $menuToggle.addClass(activeClass);
        $body.addClass(lockedScrollClass);
        $body.addClass(menuVisibleClass);
    }
}

function desktopCheck() {
    if ($(window).width() >= bpXL) {
        hideMenu($menu);
    }
}

$(document).ready(function(){

    $menuToggle.on('click', function(e) {
        e.preventDefault();

        if ($menu.hasClass(visibleClass)) {
            hideMenu();
        } else {
            showMenu();
        }
    });

    $(document).on('keyup', function(e) {
        if ($(window).width() < bpXL) {
            if (e.key === "Escape" || e.keyCode === 27) {
                hideMenu();
            }
        }
    });

    $(document).on('click', function(e) {
        if ($(window).width() < bpXL) {
            if ($menu.has(e.target).length === 0 && !$menu.is(e.target) && $menuToggle.has(e.target).length === 0 && !$menuToggle.is(e.target)) {
                hideMenu();
            }
        }
    });

    desktopCheck();

    $(window).on('orientationchange resize', function() {
        desktopCheck();
    });
});