'use strict';



let arrowContainer = document.querySelectorAll('.arrow-container');

let imageDisplayed = document.querySelector('.image-displayed');
let input = document.querySelector('.input-num-of-shoes');

let iconCartHeader = document.querySelector('.icon-cart-header');
let nav = document.querySelector('.nav');

let iconMenu = document.querySelector('.icon-menu');
let iconClose = document.querySelector('.icon-close');
let overlay = document.querySelector('.overlay');

let cartContainer = document.querySelector('.cart-container');
let emptyTextContainer = document.querySelector('.empty-text-container');
let cartItemsAndButtonContainer = document.querySelector('.cart-items-and-button-container');

let mathSymbol = document.querySelector('.math-symbol');
let iconMinus = document.querySelector('.icon-minus');
let iconPlus = document.querySelector('.icon-plus');

let buttonPage = document.querySelector('.button-page');
let iconDelete = document.querySelector('.icon-delete');

let cartPrice = document.querySelector('.cart-price');
let total = document.querySelector('.total');

let iconCartNumber = document.querySelector('.icon-cart-number');

let desktopThumbnailsRowImg = document.querySelectorAll('.desktop-thumbnails-row-img');









iconMenu.addEventListener('click', () => {
    toggleMenu();
})

iconClose.addEventListener('click', () => {
    toggleMenu();
})

overlay.addEventListener('click', () => {
    toggleMenu();
})

iconMinus.addEventListener('click', () => {
    if (input.value == 0) {
        return;
    }
    input.value--;
})

iconPlus.addEventListener('click', () => {
    input.value++;
})


document.addEventListener('click', (e) => {
    if (isCartOpen() && (!cartContainer.contains(e.target))) {
        toggleCart();
    } else if (iconCartHeader.contains(e.target) || iconCartNumber.contains(e.target)) {
        toggleCart();
    }
})

/* Check for non numbers */
input.addEventListener('input', () => {
    if (isNaN(input.value)) {
        input.value = '';
    }
})

buttonPage.addEventListener('click', () => {
    toggleCartDisplay(input.value);
})

iconDelete.addEventListener('click', () => {
    emptyTextContainer.classList.toggle('hide');
    cartItemsAndButtonContainer.classList.toggle('show-flex');
    iconCartNumber.classList.toggle('show-inline');
    input.value = '';
})

iconCartNumber.addEventListener('click', () => {
    if (!isCartItemsAndButtonContainerToggled()) {
        toggleCart();
    }
})

/* Accessory functions */
function toggleMenu() {
    nav.classList.toggle('show-block');
    overlay.classList.toggle('show-block');
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
        iconCartNumber.classList.toggle('show-inline');
    }

    if (num != 0) {
        iconCartNumber.innerHTML = num;
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




imageDisplayed.addEventListener('click', () => {
    /* Queue lightbox */
})

/*
for(let i = 0; i < desktopThumbnailsRowImg.length; i++) {
    desktopThumbnailsRowImg[i].addEventListener('click', () => {
        let index = parseInt(desktopThumbnailsRowImg[i].src.substring(71, 72));
        imageDisplayed.src = `./images/image-product-${index}.jpg`;
        toggleSelected(index);

        desktopThumbnailsRowImg[index].classList.toggle('selected');
    })
}
*/

desktopThumbnailsRowImg.forEach(img => {
    img.addEventListener('click', () => {
        let index = parseInt(img.src.substring(71, 72));
        imageDisplayed.src = `./images/image-product-${index}.jpg`;
        untoggleAllSelected(index);

        img.classList.toggle('selected');
    })
})



function untoggleAllSelected() {
    for(let i = 0; i < desktopThumbnailsRowImg.length; i++) {
        if(desktopThumbnailsRowImg[i].classList.contains('selected')) {
            desktopThumbnailsRowImg[i].classList.toggle('selected')
        }
    }
}



/* These two functions change the imageDisplayed */
arrowContainer[0].addEventListener('click', () => {
    let index = parseInt(imageDisplayed.src.substring(71, 72));

    (index - 1 == 0) ? index = 4 : index--;

    imageDisplayed.src = `./images/image-product-${index}.jpg`;
})

arrowContainer[1].addEventListener('click', () => {
    let index = parseInt(imageDisplayed.src.substring(71, 72));

    (index + 1 == 5) ? index = 1 : index++;

    imageDisplayed.src = `./images/image-product-${index}.jpg`;
})