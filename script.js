// CLOCK SCRIPT

class Clock {
    constructor() {
            this.date = new Date;
            this.month = this.date.getMonth() + 1;
            this.day = this.date.getDate();
            this.secs = this.date.getSeconds();
            this.mins = this.date.getMinutes();
            this.hours = this.date.getHours();
        }
    update (increment) {
        this.secs += increment;
        if (this.secs >= 60) {
            this.secs = this.secs - 60;
            this.mins++;
        }
        if (this.mins >= 60) {
            this.mins = 0;
            this.hours++;
        }
        if (this.hours >= 24) {
            this.hours = 0;
        }
    } 
    display() {
        this.update(1);

        let month = this.monthName(this.month);
        let HMS = [this.hours, this.mins, this.secs, this.day].map(item => item < 10 ? `0${item}`:item);

        document.getElementById('time').innerHTML = `<span class="char">${HMS[0]}</span> <span class="char">:</span> <span class="char">${HMS[1]}</span> <span class="char">:</span> <span class="char">${HMS[2]}</span>`;
        document.getElementById('date').innerHTML = `<span class="char">${month}</span> <span class="char">${HMS[3]}</span>`;
       
    }
    run() {
        setInterval(this.display.bind(this),1000);
    }
    monthName(month) {
        switch (month) {
            case 1: 
                return'Jan'
            case 2: 
                return 'Feb'
            case 3: 
                return 'Mar'
            case 4: 
                return'Apr'    
            case 5: 
                return 'May'
            case 6: 
                return 'Jun'
            case 7: 
                return 'Jul'
            case 8: 
                return 'Aug'
            case 9: 
                return 'Sep'
            case 10: 
                return 'Oct'
            case 11: 
                return'Nov'
            case 12: 
                return 'Dec'
        }
    }
}    

let clock = new Clock;

clock.run();

// --------------------------------------------------------

// CALENDER CARD CREATOR SCRIPT

// Add 'required' if input field is empty after blur event
// Retrieve input fields and add event listeners
let inputs = Array.from(document.querySelectorAll('.form-item .border'));
inputs.forEach((input) => {
    input.addEventListener('blur', checkInput);
});

function checkInput (e) {
    if (!e.target.value) {
        e.target.setAttribute('placeholder','Required')
        e.target.style.backgroundColor = 'none'
        e.target.style.border = 'solid 3px rgba(255, 0, 0, 0.5)'
    } else {
        e.target.style.border = 'solid 3px rgba(77, 240, 27, 0.5)'
    }
}


// ----------------------------------------------------------

// NEW CALENDER CARD SCRIPT

// Add event listener to ADD ITEM button
document.getElementById('add-item').addEventListener('click',addCard);

function addCard(e) {
    e.preventDefault()

    
    // Create new div for card contents
    let card = document.createElement('div');

    // Get card title, description and due date from form
    let title = document.getElementById('title-form').value;
    let description = document.getElementById('description-form').value;
    let dueDate = document.querySelector('[type="date"]').value;

    // Getting Day and Month from dueDate
    let dueMonth = parseInt(dueDate.split('').slice(5,7).join(''));
    let dueDay = dueDate.split('').slice(9).join('');

    // Get month name
    dueMonth = clock.monthName(dueMonth);
    

    // Create HTML for card
    card.innerHTML = `<div class="card border">
                        <div id="card-title" class="card-item wrap">${title}</div>

                        <div id="card-description" class="card-item wrap">${description}</div>

                        <div id="card-due"><span class="char">Due: ${dueMonth} ${dueDay}</span></div>

                        <div id="remove" class="card-item"><button class='remove'>Complete</button></div>

                     </div>`;

    // Retrieve calender-cards
    let calDeck = document.getElementById("calender-deck");

    
    // ADD CHECKS AS TO WHETHER A NEW CARD SHOULD BE ADDED, THEN ADD CARD

    // Defining/assigning success and warning messages
    let message = document.getElementById('message');
    let success = "Item added!"
    let warning1 = 'Too many active items';
    let warning2 = "Complete all input fields"

    // Determining whether all input fields are filled
    let condition = inputs.every((input) => input.value) 
    // Check number of cards
    let numOfCards = document.querySelectorAll('#calender-deck .card').length;
        
    if (condition) {
        if(numOfCards < 2) {
            calDeck.appendChild(card);

            card.querySelector('#remove').addEventListener('click',() => card.parentElement.removeChild(card));

            inputs.forEach((input => input.value = ''));
            if (message.innerText !== success) {
                message.innerText = success;
                message.classList.add('success')
            } else { return}
        }
        if (numOfCards === 2) {
            message.innerText = warning1;
            if (message.classList.contains('success')) {
                message.classList.replace('success','warning')
            }
        }  
    } else {
        message.innerText = warning2;
        if (message.classList.contains('success')) {
            message.classList.replace('success','warning');
        } else {
            message.classList.add('warning');
            }
        }   
}