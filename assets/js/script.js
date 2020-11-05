// references form from html
var formEl = document.querySelector("#task-form");
// references ul from html
var tasksToDoEl = document.querySelector("#tasks-to-do");
// variable for task counter
var taskIdCounter = 0;

// Function to add list item
var taskFormHandler = function(event) {
    // this will stop page from reloading upon submitting form
    event.preventDefault();
    // references form input entering a tasks name and implements value of text for task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // References Task Type Drop down
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    //packages data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    //sends it as an argument to createTaskEl
    createTaskEl(taskDataObj);
}
// Creates a new task HTML Element
var createTaskEl = function(taskDataObj) {
    // clicking this button will add a new list item .createElement
    var listItemEl = document.createElement("li");
    // Setting class name for li with .className
    listItemEl.className = "task-item";

    // use custom attribute to add id to each new task
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // creates a div to hold rask infor and add to list item
    var taskInfoEl = document.createElement("div")
    // Gives created div a class name
    taskInfoEl.className = "task-info";
    // add HTML Content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Appends list item to UL
    listItemEl.appendChild(taskInfoEl);
    // .appendChild will add li created to end of ul
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
}

// Upon submitting or pressing enter on their kb form perform function
formEl.addEventListener("submit", taskFormHandler);