// DOM Elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const todosList = document.getElementById("todos-list");
const itemsLeft = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const emptyState = document.querySelector(".empty-state");
const dateElement = document.getElementById("date");
const filters = document.querySelectorAll(".filter");

let todos = []; //creating empty arrya todos
let currentFilter = "all"; //takign the default filter as all


addTaskBtn.addEventListener("click", () => {
    addTodo(taskInput.value);
});

taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTodo(taskInput.value);
});

clearCompletedBtn.addEventListener("click", clearCompleted);

function addTodo(text) {
    if (text.trim() === "") return; //if nothing is there in the input then do nothing

    // creating object todo
    const todo = {
        id: Date.now(),
        text,
        completed: false,
    };

    todos.push(todo); //pushing the todo object in the todos array

    saveTodos();
    renderTodos();
    taskInput.value = ""; //to set the input value to empty
}

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    updateItemsCount()
    // Ensure empty state appears for filtered views when there are no items
    const filteredTodos = filterTodos(currentFilter);
    if (filteredTodos.length === 0) {
        emptyState.classList.remove("hidden");
    } else {
        emptyState.classList.add("hidden");
    }
}

function updateItemsCount() {
    const uncompletedTodos = todos.filter((todo) => !todo.completed);
    itemsLeft.textContent = `${uncompletedTodos?.length} item${uncompletedTodos?.length !== 1 ? "s" : ""
        } left`;
}

function checkEmptyState() {
    const filteredTodos = filterTodos(currentFilter);
    if (filteredTodos?.length === 0) emptyState.classList.remove("hidden");
    else emptyState.classList.add("hidden");
}

function filterTodos(filter) {
    switch (filter) {
        case "active":
            return todos.filter((todo) => !todo.completed);
        case "completed":
            return todos.filter((todo) => todo.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    todosList.innerHTML = "";

    const filteredTodos = filterTodos(currentFilter);

    //here for each todo we are creating the elements and adding classes which are commented in the html
    filteredTodos.forEach((todo) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        if (todo.completed) todoItem.classList.add("completed");

        const checkboxContainer = document.createElement("label");
        checkboxContainer.classList.add("checkbox-container");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox");
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.id));

        const checkmark = document.createElement("span");
        checkmark.classList.add("checkmark");

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(checkmark);

        const todoText = document.createElement("span");
        todoText.classList.add("todo-item-text");
        todoText.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
        deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

        todoItem.appendChild(checkboxContainer);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteBtn);

        todosList.appendChild(todoItem);
    });
}

function clearCompleted() {
    todos = todos.filter((todo) => !todo.completed);
    saveTodos();
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }

        return todo;
    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

function loadTodos() {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) todos = JSON.parse(storedTodos);
    renderTodos();
}

filters.forEach((filter) => {
    filter.addEventListener("click", () => {
        setActiveFilter(filter.getAttribute("data-filter"));
    });
});

function setActiveFilter(filter) {
    currentFilter = filter;

    filters.forEach((item) => {
        if (item.getAttribute("data-filter") === filter) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });

    renderTodos();
}

function setDate() {
    const options = { weekday: "long", month: "short", day: "numeric" };
    const today = new Date();
    dateElement.textContent = today.toLocaleDateString("en-US", options);
}

window.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    updateItemsCount();
    setDate();
});