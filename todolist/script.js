const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if(inputBox.value == '') {
        alert("You need to write something!!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // cross icon
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";

        li.appendChild(span);
    }

    inputBox.value = ""; //clear out search box after adding
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();

    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

}, false);

// store to do list into local storage - even if close browser
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// display data once open brwser
function showList() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showList();