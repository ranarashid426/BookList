
// BOOK CONSTRUCTOR
function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn

}

function UI() {

}

UI.prototype.addBook = function (book) {
    const row = document.createElement('tr')
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a class = "delete" href="#">x</a></td>

    `
    document.getElementById('book-list').appendChild(row)
}


UI.prototype.clearFields = function () {
    document.getElementById('title').value = ""
    document.getElementById('author').value = ""
    document.getElementById('isbn').value = ""


}
UI.prototype.deleteBook = function (target) {
    if (target.classList.contains('delete')) {
        target.parentElement.parentElement.remove()    
        this.showMessage('Book Removed Successfully','success')

    }
}

UI.prototype.showMessage = function (msg, className) {

    const form = document.getElementById('book-form')
    const container = document.querySelector('.container')
    const message = document.createElement('div')
    message.className = `alert ${className}`
    message.appendChild(document.createTextNode(msg))

    container.insertBefore(message, form)

    setTimeout(function () {
        document.querySelector('.alert').remove()
    }, 3000)

}


document.getElementById('book-form').addEventListener('submit', function (e) {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn)

    const ui = new UI()
    if (title === "" || author === "" || isbn === "") {
        ui.showMessage("PLease enter values for  all the Fields", 'error')


    } else {

        ui.addBook(book)
        ui.showMessage("Book Added", 'success')

        ui.clearFields()
    }


    e.preventDefault()
})


document.getElementById('book-list').addEventListener('click', function (e) {
         const ui = new UI()
         ui.deleteBook(e.target)

})



