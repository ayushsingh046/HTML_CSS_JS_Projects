//DOM Elements
const bmName = document.getElementById("bmName")
const bmUrl = document.getElementById("bmUrl")
const addBmBtn = document.getElementById("add-bm")
const savedBm = document.getElementById("saved-bm")

//whenever the DOM content are loaded it calls loadBookmarks function so that i can full the data from the local storage
document.addEventListener("DOMContentLoaded", loadBookmarks)

addBmBtn.addEventListener("click", function () {
    const name = bmName.value.trim()
    const url = bmUrl.value.trim()

    //checking both the inputs are given or not
    if (!name || !url) {
        alert("Please enter both name and url!!")
        return
    } else {
        //checking whether the link is in correct format or not
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            alert("Please enter a valid URL starting with http:// or https://");
            return;
        }
    }

    addBookmark(name, url)
    saveBookmark(name, url)
    //reseting the input values
    bmName.value = ""
    bmUrl.value = ""
})


function addBookmark(name, url) {
    //creating the card div and its inner elements and adding classes to them as we have made it in HTML
    const card = document.createElement("div")
    card.classList.add("card")

    const link = document.createElement("a")
    link.href = url
    link.textContent = name
    link.target = "_blank"

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-bm")
    removeBtn.textContent = "Remove"

    removeBtn.addEventListener("click", function () {
        card.remove()
        //when remove button is clicked we need to remove the card from the UI as well as from the local storage so that when we refresh the page old data don't appears
        removeBookmarkFromStorage(name, url)
    })

    card.appendChild(link)
    card.appendChild(removeBtn)
    savedBm.appendChild(card)

}
function getBookmarkFromStorage() {
    //getting the stored bookmarks from local storage
    const bookmarks = localStorage.getItem("bookmarks")
    //if there is stored bookmark then we parse it and if not empty array is returned
    return bookmarks ? JSON.parse(bookmarks) : []
}

function saveBookmark(name, url) {
    const bookmarks = getBookmarkFromStorage()
    //here first we push the object in the bookmarks array then update the array in the local storage
    bookmarks.push({ name, url })
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
}
function removeBookmarkFromStorage(name, url) {
    let bookmarks = getBookmarkFromStorage()
    //removing the bookmark from local storage when remove button has been clicked, first we get the stored data then filter out the one to remove, then update
    bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url)
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
function loadBookmarks() {
    //this function is used to load the saved bookmarks from the storage and it is called whenever the DOM get reloaded
    const bookmarks = getBookmarkFromStorage()
    bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url))

}


