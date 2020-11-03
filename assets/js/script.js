// references form from html
var formEl = document.querySelector("#task-form");
// references ul from html
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Function to add list item
var createTaskHandler = function(event) {
    // this will stop page from reloading upon submitting form
    event.preventDefault();
    // clicking this button will add a new list item .createElement
    var listItemEl = document.createElement("li");
    // Setting class name for li with .className
    listItemEl.className = "task-item";
    // Adding text to li with .textContent
    listItemEl.textContent = ("A new task has been added.");
    // .appendChild will add li created to end of ul
    tasksToDoEl.appendChild(listItemEl);
};
// Upon submitting or pressing enter on their kb form perform function
formEl.addEventListener("submit", createTaskHandler);