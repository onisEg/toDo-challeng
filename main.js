
/*
- cauth varuble
- make funtion print input value in array 
- consol this array 
- 
*/

let inputTask = document.querySelector("[type='text']");
let addTask = document.querySelector("[type= 'submit']")
let tasks = document.querySelector(".tasks")
let deleteBtn = document.querySelector(".del");
let delTask = document.querySelector(".del")

// make onclick function 
addTask.onclick = function (e) {
    e.preventDefault()
    if (inputTask.value !== "") {
        addTaskToArray(inputTask.value)
        inputTask.value = ""
        addToTasksForm()
    }
}

let tasksArr = []
// make function ( make opject - push to array - add task to localstoreg )
function addTaskToArray(taskTitle) {
    let task = {
        title: taskTitle,
        id: Date.now(),
        complete: false,
    }
    tasksArr.push(task)
    setTaskToLocalStorge(tasksArr)
    
}



// make function ( loop on array and add in tasks - if task done put classname done   )
// 
function addToTasksForm() {
    tasks.innerHTML = "" 
    tasksArr.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        div.setAttribute("data-id", task.id)
        div.appendChild(document.createTextNode(task.title))
        if (task.complete === true) {
            div.className = "task done"
        }
        let span = document.createElement("span")
        span.className = "del"
        span.appendChild(document.createTextNode("Delete"))
        div.appendChild(span)
        tasks.appendChild(div)
    })
}



// add Array to localStorage
function setTaskToLocalStorge(tasksArr) {
   window.localStorage.setItem("tasks", JSON.stringify(tasksArr))
}



// check if theres tasks in local storage and call displey tasks in form 

if (localStorage.getItem("tasks")) {
    tasksArr = JSON.parse(localStorage.getItem("tasks"))
    addToTasksForm()
    console.log(tasksArr);
}


// click on task Element 
tasks.addEventListener("click", (e) => {
    // Delete Button 
    if (e.target.classList.contains("del")) {
        //remove task from local storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"))
        // remove element from page
        e.target.parentElement.remove();

    }
    
    // task element done or not
    if (e.target.classList.contains("task")) {
        //toggle done class
        e.target.classList.toggle("done");
        //toggle completed for the task 
        toggleStatusTaskwith(e.target.getAttribute("data-id"))
        
    }



})

// make function delet with id 
function deleteTaskWith(taskId) {
// for exaplin Only
    // for (i = 0; i < tasksArr.length; i++){
    //     console.log(`${tasksArr[i].id} === ${taskId}`);
    // }

    tasksArr = tasksArr.filter((task) => task.id != taskId)
    setTaskToLocalStorge(tasksArr)
}

function toggleStatusTaskwith(taskId) {
    for (i = 0; i < tasksArr.length; i++) {

        if (tasksArr[i].id == taskId) {
            tasksArr[i].complete == false ? (tasksArr[i].complete = true) : (tasksArr[i].complete == false);
        }
    }
    setTaskToLocalStorge(tasksArr)
}