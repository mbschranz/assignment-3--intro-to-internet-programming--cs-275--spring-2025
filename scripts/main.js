//js file for project

//constants
const modal = document.querySelector(`.modal-panel`); //the modal
const modalContent = document.querySelector(`.modal-content-pane`); //the modal panel
const modalButton = document.getElementById(`js-triggers`).childNodes[3].childNodes[0];//the open modal button
const menuButton = document.getElementById(`js-triggers`).childNodes[1].childNodes[0];//the open menu button
let menuIsOpen = false;//to keep track of when the menu is open or closed
let menuMode = true;//to keep track of whether the menu dropdown is in menu mode or sidebar mode

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
    console.log(`menu button pressed`);
});

//keep track of the window size
window.onresize = function(){
    if(window.innerWidth < 736){
        //left sidebar mode
    }
    else
    {
        //top menu mode
    }
  }
