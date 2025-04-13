// select items 

const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit options
let editElement;
let editFlag = false; // only edit if click on btn
let editID = '';

// event listeners
// submit form
form.addEventListener('submit', addItem);

// clear button
clearBtn.addEventListener('click', clearItems);

// function
function addItem(e) {
    e.preventDefault();
   
    const value = grocery.value;
    const id = new Date().getTime().toString();
    
    if (value != '' && editFlag == false) { // add new 
        const element = document.createElement('article');
        // add class
        element.classList.add('grocery-item');

        // add id
        const attr = document.createAttribute('data-id');
        attr.value = id;
        element.setAttributeNode(attr);

        element.innerHTML = `<p class="title">${value}</p>
                            <div class="btn-container">
                            <button type="button" class="edit-btn"><i class="fas fa-edit"></i></button>
                            <button type="button" class="delete-btn"><i class="fas fa-trash"></i></button>
                            </div>'`;

                            // append child
        list.appendChild(element);

        displayAlert('item added', 'success');
        // show container
        container.classList.add('show-container');

        // add to local storage function
        addToLocalStorage(id, value);

        // set back to default;
        setBackToDefault();

    } else if (value != '' && editFlag === true) {  
        console.log('edit');

    } else { // submit with no value
        displayAlert('please enter value','danger');
    }
}

// display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    // add timeout
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

// clear items
function clearItems(){
    const items = document.querySelectorAll('.grocery-item');

    if (items.length > 0) {
        // items exist
        items.forEach(function(item) {
            list.removeChild(item);
        });
    }

    container.classList.remove('show-container');
    displayAlert('empty list', 'success');
    setBackToDefault();
    localStorage.removeItem('list');
}

// make the placeholder to be default 
function setBackToDefault() {
    console.log('back to default');
    grocery.value='';
    editFlag = false;
    editID='';
    submitBtn.textContent="submit";

}
// save items to local browser 
function addToLocalStorage(id,value) {
    console.log('add to local storage');
}