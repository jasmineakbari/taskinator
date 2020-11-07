// references form from html
var formEl = document.querySelector("#task-form");
// references tasks to do column
var tasksToDoEl = document.querySelector("#tasks-to-do");
// variable for task counter
var taskIdCounter = 0;
// variable for main section
var pageContentEl = document.querySelector("#page-content");
// references tasks in progress column
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
// references completed column
var tasksCompletedEl = document.querySelector("#tasks-completed");
// task ob Array
var tasks =[];

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

    var isEdit = formEl.hasAttribute("data-task-id");

    //Either creates or edits the task
    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };    
    

    
    createTaskEl(taskDataObj);
    }

};

// function for task status changes
var taskStatusChangeHandler = function(event) {
    // get the task items id
    var taskId = event.target.getAttribute("data-task-id");

    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId +"']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();
};

var completeEditTask = function(taskName, taskType, taskId) {
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    //loop through tasks array and task object with new content
    for (var i = 0; i< tasks.length; i++) {
        if(tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task Updated!");
    //resets form once edit is complete
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

    saveTasks();
};

// Creates a new task HTML Element
var createTaskEl = function(taskDataObj) {
    // clicking this button will add a new list item .createElement
    var listItemEl = document.createElement("li");
    // Setting class name for li with .className
    listItemEl.className = "task-item";

    // use custom attribute to add id to each new task
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // makes the list item draggable
    listItemEl.setAttribute("draggable", "true");

    // creates a div to hold task infor and add to list item
    var taskInfoEl = document.createElement("div")
    // Gives created div a class name
    taskInfoEl.className = "task-info";
    // add HTML Content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // Appends list item to UL
    listItemEl.appendChild(taskInfoEl);

    // assigning id to to dataobj
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // taskIdCounter is used as argument to create buttons correspond to current task id
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);
    // .appendChild will add li created to end of ul
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;

    saveTasks();
}

// function to add task actions and dropdowns to update the created action
var createTaskActions = function(taskId) {
    // creates div to hold update actions
    var actionContainerEl = document.createElement("div");
    // assigns class for div
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    // appends to div created
    actionContainerEl.appendChild(editButtonEl);

    // creates delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    //appends to div created
    actionContainerEl.appendChild(deleteButtonEl);

    // creates a dropdown option for task
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

// Upon submitting or pressing enter on their kb form perform function
formEl.addEventListener("submit", taskFormHandler);
// taskButtonHandler function
var taskButtonHandler = function(event) {
    // get target element from event
    var targetEl = event.target;

    // if edit button is clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }

    // if delete button is clicked
    else if (event.target.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

var editTask = function(taskId) {

    // get task list item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // when in edit mode task selected inputs are replaced in name and type inputs
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    // assigning id and updating add task to save task when in edit mode
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);
};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
    // create a new array to hold updated list of tasks
    var updatedTaskArr = [];

    //loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        //keep task only if id doesn't match value of taskId and push to new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }

    //reassign old array to be the same as new array
    tasks = updatedTaskArr;

    saveTasks();

};

var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    // stores task id in data transfer property in console
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
}

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

// function handling dropping tasks
var dropTaskHandler = function(event) {
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id ='" +id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

    if (statusType ==="tasks-do-do") {
        statusSelectEl.selectedIndex = 0;
    }
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    }
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }

    // removes extra styling on columns upon dropping task
    dropZoneEl.removeAttribute("style");
    dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updates task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
            tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }

    saveTasks();
}

var dragLeaveHandler = function(event){
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
}

// save tasks to localstoarge function
var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Gets task item from local Storage
//converts tasks from string form back into an array of objs
//iterates through a tasks array and creates task elements on the page from it
var loadTasks = function() {
    var savedTasks = localStorage.getItem("tasks");

    if (!savedTasks) {
      return false;
    }
  
    savedTasks = JSON.parse(savedTasks);

  for (var i = 0; i < savedTasks.length; i++) {
      createTaskEl(savedTasks[i]);
    }

};

// event listener for drag leave
pageContentEl.addEventListener("dragleave", dragLeaveHandler);

// event listener to drop items in columns
pageContentEl.addEventListener("drop", dropTaskHandler);

// event listener to confine dragging of items in columns
pageContentEl.addEventListener("draggable", dropZoneDragHandler);

// event listener to all dragover
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// dragstart event listener for Main Section
pageContentEl.addEventListener("dragstart", dragTaskHandler);

// event listener for Main Section clicks
pageContentEl.addEventListener("click", taskButtonHandler);

// event listener for task drop down
pageContentEl.addEventListener("change", taskStatusChangeHandler);

loadTasks();