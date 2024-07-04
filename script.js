document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    setTimeout(function() {
        loadingScreen.style.opacity = '0';

        setTimeout(function() {
            loadingScreen.style.display = 'none';
            body.style.overflow = 'visible';
        }, 500);
    }, 700);
});

let isSticky = false;
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    var anchor = document.getElementById('anchor');
    var sticky = navbar.offsetTop;
    var absolute = anchor.offsetTop;

    if (window.pageYOffset >= sticky && !isSticky) {
        isSticky = true;
        navbar.style.position = 'fixed';
        navbar.style.top = 0;
    } else if (window.pageYOffset < absolute && isSticky) {
        isSticky = false;
        navbar.style.position = 'absolute';
        navbar.style.removeProperty('top');
    }
});