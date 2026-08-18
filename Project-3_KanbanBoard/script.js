//DOM Elements
const cards = document.querySelectorAll(".card")
const lists = document.querySelectorAll(".list")

//to add event Listener to all the cards
for (const card of cards) {
    card.addEventListener("dragstart", dragStart)
    card.addEventListener("dragend", dragEnd)
}

//to add event Listener to all the lists
for (const list of lists) {
    list.addEventListener("dragover", dragOver)
    list.addEventListener("dragenter", dragEnter)
    list.addEventListener("dragleave", dragLeave)
    list.addEventListener("drop", dragDrop)
}

//frm line 20 to 47 all the code has been take from documentation "https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API"
function dragStart(e) {
    //this allows the drop location to know which element is being moved when you release it
    e.dataTransfer.setData("text/plain", this.id)

}
function dragEnd() {
    console.log("Drag Ended")
}
function dragOver(e) {
    //this line is important because by default, borwsers don't allow you to drop elements onto the elements
    e.preventDefault()
}
function dragEnter(e) {
    e.preventDefault()

    this.classList.add("over")
}
function dragLeave(e) {
    this.classList.remove("over");
}

function dragDrop(e) {
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);

    this.appendChild(card);
    this.classList.remove("over");
}

// Add To Do
const enterToDo = document.querySelector(".enter-to-do")
const addBtn = document.getElementById("add-btn")
const todoList = document.getElementById("list1")

//event listeners of adding To Do
addBtn.addEventListener("click", addToDo)
enterToDo.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault()
        addToDo()
    }
})

//logic for creating a new card in To Do taking input from user
function addToDo() {
    const taskText = enterToDo.value.trim()

    if (!taskText) return

    const newCard = document.createElement("div")
    newCard.className = "card"
    newCard.draggable = true
    newCard.id = `card${Date.now()}`
    newCard.textContent = taskText

    newCard.addEventListener("dragstart", dragStart)
    newCard.addEventListener("dragend", dragEnd)

    todoList.appendChild(newCard)
    enterToDo.value = ""
    enterToDo.focus()
}