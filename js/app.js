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

    document.querySelector('.video__switch').addEventListener('click', function() {
        ui.videoControls();
    })
}

function UI() {

}

UI.prototype.hidePreloader = function() {
    document.querySelector('.preloader').style.display = 'none';
}

UI.prototype.showNav = function() {
    document.querySelector('.nav').classList.toggle('nav--show');
}

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