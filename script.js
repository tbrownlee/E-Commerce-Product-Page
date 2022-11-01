'use strict';

let arrowContainer = document.querySelectorAll('.arrow-container');
let buttonPage = document.querySelector('.button-page');
let cartContainer = document.querySelector('.cart-container');
let cartItemsAndButtonContainer = document.querySelector('.cart-items-and-button-container');
let cartPrice = document.querySelector('.cart-price');
let desktopDisplayed = document.querySelector('.desktop-displayed');
let desktopOverlay = document.querySelector('.desktop-overlay');
let desktopThumbnailsRowImg = document.querySelectorAll('.desktop-thumbnails-row-img');
let emptyTextContainer = document.querySelector('.empty-text-container');
let iconCartHeader = document.querySelector('.icon-cart-header');
let iconCartHeaderNumber = document.querySelector('.icon-cart-header-number');
let iconDelete = document.querySelector('.icon-delete');
let iconMenu = document.querySelector('.icon-menu');
let iconMinus = document.querySelector('.icon-minus');
let iconPlus = document.querySelector('.icon-plus');
let imageDisplayed = document.querySelector('.image-displayed');
let input = document.querySelector('.input-num-of-shoes');
let logo = document.querySelector('.logo');
let mathSymbol = document.querySelector('.math-symbol');
let mobileOverlay = document.querySelector('.mobile-overlay');
let nav = document.querySelector('.nav');
let navIconClose = document.querySelector('.nav-icon-close');
let overlayArrowContainer = document.querySelectorAll('.overlay-arrow-container')
let overlayDisplayed = document.querySelector('.overlay-displayed');
let overlayIconClose = document.querySelector('.overlay-icon-close');
let overlayImagesContainer = document.querySelector('.overlay-images-container');
let overlayThumbnailsRowImg = document.querySelectorAll('.overlay-thumbnails-row-img');
let total = document.querySelector('.total');




desktopThumbnailsRowImg[0].classList.toggle('selected');



/* Event listeners*/
iconMenu.addEventListener('click', () => {
    toggleMenu();
});

navIconClose.addEventListener('click', () => {
    toggleMenu();
});

mobileOverlay.addEventListener('click', () => {
    toggleMenu();
});

desktopOverlay.addEventListener('click', (e) => {
    if (!overlayImagesContainer.contains(e.target)) {
        desktopOverlay.classList.toggle('show-desktop-overlay');
        overlayDisplayed.src = desktopDisplayed.src;
    }
});

overlayIconClose.addEventListener('click', () => {
    desktopOverlay.classList.toggle('show-desktop-overlay');
    overlayDisplayed.src = desktopDisplayed.src;

    untoggleAllSelected(overlayThumbnailsRowImg); 
});

iconMinus.addEventListener('click', () => {
    if (input.value == 0) {
        return;
    }
    input.value--;
});

iconPlus.addEventListener('click', () => {
    input.value++;
});


document.addEventListener('click', (e) => {
    if (isCartOpen() && (!cartContainer.contains(e.target))) {
        toggleCart();
    } else if (iconCartHeader.contains(e.target) || iconCartHeaderNumber.contains(e.target)) {
        toggleCart();
    }
});

/* Checks for non numbers */
input.addEventListener('input', () => {
    if (isNaN(input.value)) {
        input.value = '';
    }
});

buttonPage.addEventListener('click', () => {
    toggleCartDisplay(input.value);
});

iconDelete.addEventListener('click', () => {
    emptyTextContainer.classList.toggle('hide');
    cartItemsAndButtonContainer.classList.toggle('show-flex');
    iconCartHeaderNumber.classList.toggle('show-inline');
    input.value = '';
});

iconCartHeaderNumber.addEventListener('click', () => {
    if (!isCartItemsAndButtonContainerToggled()) {
        toggleCart();
    }
});

/* Queue lightbox */
imageDisplayed.addEventListener('click', () => {
    let mediaQuery = window.matchMedia('(max-width: 813px)');
    if(mediaQuery.matches) {
        return;
    }
    desktopOverlay.classList.toggle('show-desktop-overlay');
    overlayDisplayed.src = imageDisplayed.src;

    untoggleAllSelected(overlayThumbnailsRowImg);

    let index = parseInt(imageDisplayed.src.slice(-5, -4));
    toggleOverlayThumbnailImg(index);
});

desktopThumbnailsRowImg.forEach(img => {
    img.addEventListener('click', () => {
        let index = parseInt(img.src.slice(-15, -14));
        imageDisplayed.src = `./images/image-product-${index}.jpg`;
        untoggleAllSelected(desktopThumbnailsRowImg);

        img.classList.toggle('selected');
    })
});

overlayThumbnailsRowImg.forEach(img => {
    img.addEventListener('click', () => {
        let index = parseInt(img.src.slice(-15, -14));
        overlayDisplayed.src = `./images/image-product-${index}.jpg`;
        untoggleAllSelected(overlayThumbnailsRowImg);

        img.classList.toggle('selected');
    })
});

/* These two functions change the imageDisplayed */
arrowContainer[0].addEventListener('click', () => {
    let index = parseInt(imageDisplayed.src.slice(-5, -4));

    (index - 1 == 0) ? index = 4 : index--;

    imageDisplayed.src = `./images/image-product-${index}.jpg`;
});

arrowContainer[1].addEventListener('click', () => {
    let index = parseInt(imageDisplayed.src.slice(-5, -4));

    (index + 1 == 5) ? index = 1 : index++;

    imageDisplayed.src = `./images/image-product-${index}.jpg`;
});

overlayArrowContainer[0].addEventListener('click', () => {
    let index = parseInt(overlayDisplayed.src.slice(-5, -4));

    (index - 1 == 0) ? index = 4 : index--;

    overlayDisplayed.src = `./images/image-product-${index}.jpg`;

    untoggleAllSelected(overlayThumbnailsRowImg);
    toggleOverlayThumbnailImg(index);
});

overlayArrowContainer[1].addEventListener('click', () => {
    let index = parseInt(overlayDisplayed.src.slice(-5, -4));

    (index + 1 == 5) ? index = 1 : index++;

    overlayDisplayed.src = `./images/image-product-${index}.jpg`;

    untoggleAllSelected(overlayThumbnailsRowImg);
    toggleOverlayThumbnailImg(index);
});

logo.addEventListener('click', () => {
    window.location.reload();
});

/* Accessory functions */
function toggleMenu() {
    nav.classList.toggle('show-menu');
    mobileOverlay.classList.toggle('show-overlay');
}

function toggleCart() {
    iconCartHeader.classList.toggle('filter-black');
    cartContainer.classList.toggle('show-flex');
}

function isCartOpen() {
    return cartContainer.classList.contains('show-flex');
}

function toggleCartDisplay(num) {
    if (num != 0 && !isCartItemsAndButtonContainerToggled()) {
        emptyTextContainer.classList.toggle('hide');
        cartItemsAndButtonContainer.classList.toggle('show-flex');
        iconCartHeaderNumber.classList.toggle('show-inline');
    }

    if (num != 0) {
        iconCartHeaderNumber.innerHTML = num;
        updateAmountAndTotal(num);
    }
}

function isCartItemsAndButtonContainerToggled() {
    return cartItemsAndButtonContainer.classList.contains('show-flex');
}

function updateAmountAndTotal(num) {
    cartPrice.innerHTML = '$125.00 x ' + num + ' ';

    let total = document.createElement('span');
    total.className = 'total';
    total.innerHTML = ' $' + num * 125 + '.00';
    cartPrice.append(total)
}

/* Multi use function */
function untoggleAllSelected(type) {
    for (let i = 0; i < type.length; i++) {
        if (type[i].classList.contains('selected')) {
            type[i].classList.toggle('selected')
        }
    }
}

function toggleOverlayThumbnailImg(index) {
    for (let i = 0; i < overlayThumbnailsRowImg.length; i++) {
        let num = parseInt(overlayThumbnailsRowImg[i].src.slice(-15, -14));
        if (num == index) {
            overlayThumbnailsRowImg[i].classList.toggle('selected');
        }
    }
}