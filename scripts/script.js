// ----- LOADING -----

document.addEventListener("DOMContentLoaded", function() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;

    getNoAlcohol();
    getAlcohol();
    getCocktails();

    setTimeout(function() {
        getFood();
        loadingScreen.style.opacity = '0';

        setTimeout(function() {
            loadingScreen.style.display = 'none';
            body.style.overflow = 'visible';
        }, 500);
    }, 700);
});

// ----- NAVBAR -----
if (window.innerWidth > 768) {
    let isSticky = false;
    window.addEventListener('scroll', function() {
        var navbar = document.getElementById('navbar');
        var anchor = document.getElementById('anchor');
        var sticky = navbar.offsetTop;
        var absolute = anchor.offsetTop;

        if (window.pageYOffset >= sticky && !isSticky) {
            isSticky = true;
            navbar.style.top = 0;
            navbar.style.position = 'fixed';
        } else if (window.pageYOffset < absolute && isSticky) {
            isSticky = false;
            navbar.style.removeProperty('top');
            navbar.style.position = 'absolute';
        }
    });
}
// ----- COPY PHONE -----

document.getElementById('phone').addEventListener('click', function() {
    phone = document.getElementById('phone');

    var phoneNumber = '+79101276863';

    const input = document.createElement('input');
    input.setAttribute('value', phoneNumber);

    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');

    document.body.removeChild(input);
    phone.style.color = '#942e19';
    phone.textContent = 'Скопированно!';
    setTimeout(function() {
        phone.style.removeProperty('color');
        phone.textContent = '+7 (910) 127-68-63';
    }, 1000)
});

// ----- MENU -----

menu = document.getElementById('menu');

function clearAllContainers() {
    menu.innerHTML = '';
}

function getFood(btn) {
    fetch('menu/food.html')
    .then(response => response.text())
    .then(data => {
        clearAllContainers();
        menu.style.gridTemplateColumns = window.innerWidth > 768 ? '1fr 1fr 1.5fr' : 'repeat(2, 1fr)';
        menu.innerHTML = data;
        adjustGrid();
        typeBtnsColor(btn);
    })
}

function getCocktails(btn) {
    fetch('menu/cocktails.html')
    .then(response => response.text())
    .then(data => {
        clearAllContainers();
        menu.style.gridTemplateColumns = window.innerWidth > 768 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)';    
        menu.innerHTML = data;
        adjustGrid();
        typeBtnsColor(btn);
    })
}

function getAlcohol(btn) {
    fetch('menu/alcohol.html')
    .then(response => response.text())
    .then(data => {
        clearAllContainers();
        menu.style.gridTemplateColumns = 'repeat(2, 1fr)';
        menu.innerHTML = data;
        adjustGrid();
        typeBtnsColor(btn);
    })
}

function getNoAlcohol(btn) {
    fetch('menu/noAlcohol.html')
    .then(response => response.text())
    .then(data => {
        clearAllContainers();
        menu.style.gridTemplateColumns = 'repeat(2, 1fr)';
        menu.innerHTML = data;
        adjustGrid();
        typeBtnsColor(btn);
    })
}

function typeBtnsColor(activeBtn) {
    const buttons = document.querySelectorAll('.typeBtn');

    buttons.forEach(button => {
        button.style.removeProperty('color');
    });

    if (activeBtn != undefined) {
        activeBtn.style.color = '#942e19';
    } else {
        document.getElementById('foodBtn').style.color = '#942e19';
    }
}

// ----- MENU GRID -----

function adjustGrid() {
    const menuBoxes = document.querySelectorAll('.menuBox');

    menuBoxes.forEach(menuBox => {
        const menuItems = menuBox.querySelectorAll('.menuItem');
        const itemCount = menuItems.length;

        let columns = 1;

        for (let i = 4; i < itemCount; i += 4) {
            columns += 1;
        }

        menuBox.style.gridTemplateColumns = window.innerWidth > 768 ? `repeat(${columns}, 1fr)` : '1fr';
    });
}
