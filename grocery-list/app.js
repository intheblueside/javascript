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

// load items
window.addEventListener('DOMContentLoaded', setupItems);

// function
function addItem(e) {
    e.preventDefault();
   
    const value = grocery.value;
    const id = new Date().getTime().toString();
    
    if (value != '' && editFlag == false) { // add new 
        
        createListItem(id, value);

        displayAlert('item added', 'success');
        // show container
        container.classList.add('show-container');

        // add to local storage function
        addToLocalStorage(id, value);

        // set back to default;
        setBackToDefault();

    } else if (value != '' && editFlag === true) {  
        editElement.innerHTML = value;
        displayAlert('value updated', 'success');
        editLocalStorage(editID, value);
        setBackToDefault();

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

// delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement; // grocery-items
    const id = element.dataset.id;
    
    list.removeChild(element);

    if (list.children.length === 0) {
        container.classList.remove('show-container');
    }

    displayAlert('item removed', 'danger');
    setBackToDefault();

    // remove from local storage
    removeFromLocalStorage(id);
}

function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement; // grocery-items container

    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling; // title tag

    // set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;

    // change submit value to new one
    submitBtn.textContent = "Edit";
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
    // store array of id and items
    const grocery = {id:id, value:value}; // if same property id then can just leave it as one 
                                            // {id, value} is valid
    let items = localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')):[];

    items.push(grocery);
    localStorage.setItem('list', JSON.stringify(items));
}

// remove from local storage
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function(item) {
        if (item.id != id) {
            return item;
        }
    });
    //override
    localStorage.setItem('list', JSON.stringify(items));

}

function editLocalStorage(id, value) {
    let items = getLocalStorage();
    items = items.map(function(item) {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });

    localStorage.setItem('list', JSON.stringify(items));

}

function getLocalStorage() {
    // return list array if there is already smthg there
    // if none then return the empty array
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem('list')):[];
}

// local storage save as string
/*
localStorage.setItem("orange",JSON.stringify(['item1', 'item2']));
const orange = JSON.parse(localStorage.getItem("orange"));
console.log(orange);
*/

// setup items function
function setupItems() {
    let items = getLocalStorage();

    if (items.length >0){
        items.forEach(function(item) {
            createListItem(item.id, item.value);
        });
        container.classList.add('show-container');
    }
}

function createListItem(id, value) {
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

        const deleteBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');

        deleteBtn.addEventListener('click',deleteItem);
        editBtn.addEventListener('click',editItem);
        
        // append child
        list.appendChild(element);
}
