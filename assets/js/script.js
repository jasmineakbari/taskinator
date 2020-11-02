// references button from html
var buttonEl = document.querySelector("#save-task");
// references ul from html
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Function to add list item
var createTaskHandler = function() {
    //clicking this button will add a new list item .createElement
    var listItemEl = document.createElement("li");
    //Setting class name for li with .className
    listItemEl.className = "task-item";
    // Adding text to li with .textContent
    listItemEl.textContent = "This is a new task.";
    // .appendChild will add li created to end of ul
    tasksToDoEl.appendChild(listItemEl);
};
// Upon clicking button perform function
buttonEl.addEventListener("click", createTaskHandler);