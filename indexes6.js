class Book{
    constructor(title,author,isbn){
        this.title = title
        this.author = author
        this.isbn = isbn

    }
}

class Store{
    static displayBooks(){
        let books = Store.getBooks()
        books.forEach(book => {
            const ui = new UI()
            ui.addBook(book)
            
        });







    }
    
    static getBooks(){
        let books;
        if (localStorage.getItem('books') === null) {
            books = []
            
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static addBook(book){
        const books = this.getBooks();
        books.push(book)
        

        localStorage.setItem('books',JSON.stringify(books))
    }


    static removeBook(isbn){
        let books = this.getBooks()
        books.forEach((book,index) => {
            if(book.isbn ===isbn) {
                books.splice(index,1)
            }
        })

        console.log(isbn)
        localStorage.setItem('books',JSON.stringify(books))

    }
}


class UI{
    addBook(book){
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class = "delete" href="#">x</a></td>
    
        `
        document.getElementById('book-list').appendChild(row)
    }
    clearFields(){
        document.getElementById('title').value = ""
        document.getElementById('author').value = ""
        document.getElementById('isbn').value = ""

    }

    deleteBook(target){
        if (target.classList.contains('delete')) {
            target.parentElement.parentElement.remove()    
            this.showMessage('Book Removed Successfully','success')
    
        }

    }
    showMessage(msg,className){
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
}




// DOM EVENT LISTENER

document.addEventListener('DOMContentLoaded', Store.displayBooks())
// 
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
        Store.addBook(book)
        ui.showMessage("Book Added", 'success')

        ui.clearFields()
    }


    e.preventDefault()
})


document.getElementById('book-list').addEventListener('click', function (e) {
         const ui = new UI()
         ui.deleteBook(e.target)

         Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
        //  Store.removeBook(e.target.classList.contains('delete'))

})


