// hide preloader
// all the images scripts links have finished loading

// window event list


// ------------------------------------------------------------
// NOT REFACTORED: Code with multiple addEventListener
// ------------------------------------------------------------

/* 
window.addEventListener('load', function() {
    document.querySelector('.preloader').style.display = 'none';
})

// nav btn
document.querySelector('.navBtn').addEventListener('click', function() {
    document.querySelector('.nav').classList.toggle('nav--show');
})

// switch btn
document.querySelector('video__switch-btn').addEventListener('click', function() {

})
*/

// -----------------------------------------------------------------------------
// REFACTORING FOR BETTER READIBILITY: use of a single addEventListeners function
// -----------------------------------------------------------------------------


// HOW TO REFACTOR
// 1) Create function that is going to create all the event listeners
// 2) After the function is declared, call it
// 3) Move callback outside of the function and set it equal to a method to an actual UI object that we will be creating
// 4) And creat a construction function that have a method 


eventListeners();

function eventListeners() {
    const ui = new UI()

    window.addEventListener('load', function() {
        ui.hidePreloader();
    })
    
    // nav btn
    document.querySelector('.navBtn').addEventListener('click', function() {
        ui.showNav();
    })

    // video control
    document.querySelector('.video__switch').addEventListener('click', function() {
        ui.videoControls();
    })

    // submit the form
    document.querySelector('.drink-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.querySelector('.input-name').value;
        const lastname = document.querySelector('.input-lastname').value;
        const email = document.querySelector('.input-email').value;

        let value = ui.checkEmpty(name, lastname, email);

        if(value === true) {
            // We are creating a customer object - we basically need to
            // have the 3 information returned in order to do somethiing 
            // with that
            let customer = new Customer(name, lastname, email);


            ui.addCustomer(customer);

            ui.showFeedback('customer added to the list', 'success');
            ui.clearFields();
        } else {
            ui.showFeedback('some form values are empty', 'error');
        }
    })

    // display modal
    const links = document.querySelectorAll('.work-item__icon');
    // item represent each and every value in the array 
    links.forEach(function(item) {
        // now for every item I am attaching an eventListener
        item.addEventListener('click', function(event) {
            event.preventDefault();
            ui.showModal(event);
        })
    })

    // hide modal
    document.querySelector('.work-modal__close').addEventListener('click', function() {
        ui.closeModal();
    })
    
}

function UI() {

}

// hide preloader
UI.prototype.hidePreloader = function() {
    document.querySelector('.preloader').style.display = 'none';
}

// show Navbar
UI.prototype.showNav = function() {
    document.querySelector('.nav').classList.toggle('nav--show');
}

// play/pause the video
UI.prototype.videoControls = function() {
    // document.querySelector('.video__switch-btn').classList.toggle('btnSlide');
    let btn = document.querySelector('.video__switch-btn');
    // if it does not have the class, then lets add it
    if(!btn.classList.contains('btnSlide')) {
        btn.classList.add('btnSlide')
        document.querySelector('.video__item').pause();
    }
    // else is it is already clicked lets remove the class
    else {
        btn.classList.remove('btnSlide')
        document.querySelector('.video__item').play();
    }
}

// check if the form is correctly filled
// [Below notation is if we want to convert into arrow function]
// UI.prototype.checkEmpty = (name, lastname, email) => {

UI.prototype.checkEmpty = function(name, lastname, email) {
    let result;
    if(name === '' || lastname === '' || email === '') {
        result = false;
    } else {
        result = true;
    }
    return result;
}


UI.prototype.showFeedback = function(text, type) {
    if(type === 'success') {
        let feedback = document.querySelector('.drink-form__feedback');
        feedback.classList.add('success');
        feedback.innerText = text;
        this.removeAlert('success');
    } else if(type === 'error') {
        let feedback =  document.querySelector('.drink-form__feedback');
        feedback.classList.add('error');
        feedback.innerText = text;
        this.removeAlert('error');
    }
}

// remove alert
UI.prototype.removeAlert = function(type) {
    setTimeout(function() {
        document.querySelector('.drink-form__feedback').classList.remove(type);
    }, 3000)
}

// add customer : the function is receiving an object
UI.prototype.addCustomer = function(customer) {
    // lets create an array of images contained in the img folder
    // those images are the number of people to add
    const images = [1,2,3,4,5];
    let random = Math.floor(Math.random()*images.length);

    // now after the number of the image is found
    // we will need to create a div to add to the grid-template-column
    // In order to do this we will use innerHtml function

    const div = document.createElement('div');
    div.classList.add('person');
    div.innerHTML = `            
        <img src="img/person-${random}.jpeg" alt="person" class="person__thumbnail">
        <h4 class="person__name">${customer.name}</h4>
        <h4 class="person__last-name">${customer.lastname}</h4>
    `;
    document.querySelector('.drink-card__list').appendChild(div);

    console.log(random);
}

// clear fields
UI.prototype.clearFields = function() {
    document.querySelector('.input-name').value = '';
    document.querySelector('.input-lastname').value = '';
    document.querySelector('.input-email').value = '';
}

// show modal
UI.prototype.showModal = function(event) {
    // console.log(event.target.parentElement);
    if(event.target.parentElement.classList.contains('work-item__icon'));
    let id = event.target.parentElement.dataset.id;

    const modal = document.querySelector('.work-modal');
    const modalItem = document.querySelector('.work-modal__item');

    modal.classList.add('work-modal--show');
    modalItem.style.backgroundImage = `url(img/work-${id}.jpeg)`;

}

// hide modal
UI.prototype.closeModal = function() {
    document.querySelector('.work-modal').classList.remove('work-modal--show');
}

// object constructor function
function Customer(name, lastname, email) {
    this.name = name,
    this.lastname = lastname,
    this.email = email;
}







// ------------------------------------------------------------
// FOR ES6 NOTATION
// ------------------------------------------------------------
/*

class UI {
    // class instance method
    hidePreloader() {
        document.querySelector('.preloader').style.display = 'none';
    }

    showNav() {
        document.querySelector('.nav').classList.toggle('nav--show');
    }
}
// event listeners
eventListeners();

function eventListeners() {
    const ui = new UI()

    // preloader
    window.addEventListener('load', () => ui.hidePreloader())

    // navBtn : below function are applied to the whole window 
    // so be careful
    // window.addEventListener('click', () => ui.showNav()); 
    // oppure
    // window.addEventListener('click', function() {
    //     ui.showNav();
    // });

    // oppure ancora
    // This is correct because it is applied only to the navBtn
    document.querySelector('.navBtn').addEventListener('click', () => ui.showNav());

    // oppure ancora
    // document.querySelector('.navBtn').addEventListener('click', function() {
    //     ui.showNav();
    // })

}
*/