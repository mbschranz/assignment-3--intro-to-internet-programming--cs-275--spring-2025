//constants
const modal = document.querySelector(`.modal-panel`); //the modal
const modalContent = document.querySelector(`.modal-content-pane`); //the modal panel
const modalButton = document.getElementById(`js-triggers`).childNodes[3].childNodes[0];//the open modal button
const menuButton = document.getElementById(`js-triggers`).childNodes[1].childNodes[0];//the open menu button
const menu = document.querySelector(`nav`);//the dropdown menu
let menuIsOpen = false;//to keep track of when the menu is open or closed
let menuMode = true;//to keep track of whether the menu dropdown is in menu mode or sidebar mode

console.log(menu);
console.log(menu.children);
//MODAL FUNCTIONS
//event listener for the open modal click
modalButton.addEventListener(`click`, () => {
    console.log(`modal open pressed!`);
    modal.style.top = `0`;
});

//event listener for modal click
modal.addEventListener(`click`, () => {
    console.log(`modal clicked`);
    modal.style.top = `-100vh`;
});

//event listener for the escape key
document.addEventListener(`keydown`, function (e) {
    if (e.key == `Escape`) {
        console.log(`close modal with ESC key`);
        modal.style.top = `-100vh`;
    }
});

//event listener for modal content panel click (to prevent propigation)
modalContent.addEventListener(`click`, e => {
    console.log(`modal content panel clicked`);
    e.stopPropagation();    //prevent the modal click trigger
});

//DROPDOWN/SIDEBAR FUNCTIONS
//event listener for opening the dropdown menu (which opens and closes it)
menuButton.addEventListener(`click`, () => {
    menu.style.transitionProperty = `top, left`;    //make sure it transitions
    console.log(`menu button pressed`);
    //when the menu is open, switch to the closed state and vice versa.
    if (menuIsOpen) {
        //then if on menu mode, move up and down, or left and right if in sidebar mode.
        if (menuMode) {
            menu.style.top = `30px`;
            menu.style.left = `auto`;
        }
        else {
            menu.style.left = `-30%`;
        }
        menuIsOpen = false;
    }
    else {
        //then if on menu mode, move up and down, or left and right if in sidebar mode.
        if (menuMode) {
            menu.style.top = `63px`;
            menu.style.left = `auto`;
        }
        else {
            menu.style.left = `0`;
        }
        menuIsOpen = true;
    }

});

//keep track of the window size
window.onresize = function () {
    //make sure no transitions happen when just altering the viewport
    menu.style.transitionProperty = `none`;
    if (window.innerWidth < 736) {
        //left sidebar mode
        menuMode = false;
        if (menuIsOpen) {
            //move to the visible position
            menu.style.top = `63px`;
            menu.style.left = 0;
            menu.style.right = `auto`;
            menu.firstElementChild.style.flexDirection = `column`;
        }
        else {
            //move to the hidden position
            menu.style.top = `63px`;
            menu.style.left = `-30%`;
            menu.style.right = `auto`;
            menu.firstElementChild.style.flexDirection = `column`;
        }
    }
    else {
        //top menu mode
        menuMode = true;
        if (menuIsOpen) {
            //move to the visible position
            menu.style.top = `63px`;
            menu.style.left = `auto`;
            menu.style.right = `30%`;
            menu.firstElementChild.style.flexDirection = `row`;
        }
        else {
            //move to the hidden position
            menu.style.top = `25px`;
            menu.style.left = `auto`;
            menu.style.right = `30%`;
            menu.firstElementChild.style.flexDirection = `row`;
        }
    }
};
