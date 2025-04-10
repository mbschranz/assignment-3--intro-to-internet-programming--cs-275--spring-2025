//js file for project

//constants
const modal = document.querySelector(`.modal-panel`); //the modal
const modalContent = document.querySelector(`.modal-content-pane`); //the modal panel
const modalButton = document.getElementById(`js-triggers`).childNodes[3].childNodes[0];//the open modal button

//functions
//event listener for the open modal click
modalButton.addEventListener(`click`, () =>{
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
