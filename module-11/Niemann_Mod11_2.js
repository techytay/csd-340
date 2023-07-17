// Taylor Niemann : Assignment 11.2

// Create elements
const form = document.getElementById("new-task-form");
let toDoInput = document.getElementById("inputField");
let toDoListElement = document.getElementById("toDoList");
let toDoList = [];
let editToDoId = -1;

// Submit the form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from refreshing
    // Add element and display element every time one is added
    addToDo();
    displayToDo();
})

// Function to add item to list
function addToDo() {
    var toDoValue = toDoInput.value;    

    // Add entry or alert if no input is in text field
    var isEmpty = toDoValue === '';
    if(isEmpty) {
        alert("Input is empty. Please type something.");
        return;
    } else {
        if(editToDoId >= 0) {
            toDoList = toDoList.map((toDo, index) => ({
                ...toDo,
                value: index === editToDoId ? toDoValue : toDo.value,
            }));
            editToDoId = -1;
        } else {
            toDoList.push({
            value: toDoValue,
            checked: false,
            color: '#' + Math.floor(Math.random()*16777215).toString(16)            
            });
        }
        toDoInput.value = ""; // Clear input once it has been added
    }  
}

// Display items on list
function displayToDo() {
    toDoListElement.innerHTML = ""; // Clear elements before a display
    toDoList.forEach((toDo, index) => {
        toDoListElement.innerHTML += `
        <div class="toDo" id=${index}>
            <i class="bi ${toDo.checked ? 'bi-check-square-fill' : 'bi-square'}"
            style="color : ${toDo.color}"
            data-action="check"
            ></i>
            <p class="" data-action="check">${toDo.value}</p>
            <i class="bi bi-pencil-square" data-action="edit"></i>
            <i class="bi bi-trash" data-action="delete"></i>
        </div>
        `;
    });
}

// Click event listener for each list element
toDoListElement.addEventListener('click', (event) => {
    let target = event.target;
    let parentElement = target.parentNode;
    
    if (parentElement.className !== 'toDo') return;

    // To do ID
    let toDo = parentElement;
    let toDoId = Number(toDo.id);

    // Target action
    let action = target.dataset.action;

    action === "check" && checkToDo(toDoId);
    action === "edit" && editToDo(toDoId);
    action === "delete" && deleteToDo(toDoId);
});

// Check mark a task
function checkToDo(toDoId) {
    toDoList = toDoList.map((toDo, index) => ({
        ...toDo,
        checked: index === toDoId ? !toDo.checked : toDo.checked,
    }));
    displayToDo();
}

// Edit a task
function editToDo(toDoId) {
    toDoInput.value = toDoList[toDoId].value;
    editToDoId = toDoId;
}

// Delete a task
function deleteToDo(toDoId) {
    toDoList = toDoList.filter((toDo, index) => index !== toDoId);
    editToDoId = -1; // Ensure that a task can be edited after a task has been deleted  
    displayToDo();
}