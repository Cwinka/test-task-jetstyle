import { makeAutoObservable } from "mobx"

class Books {
    books = new Array
    #last_idx = 0
    constructor() {
        makeAutoObservable(this);
    }
    setBooks(books_list) {
        this.books = books_list
        this.#last_idx = books_list.length - 1
        this.#updateBooksInLocalStorage()
    }
    #updateBooksInLocalStorage(){
        localStorage.setItem('books', JSON.stringify(this.books))
    }
    addBook(author, title, imgFile){
        this.#formBase64ThenDo(author, title, imgFile, (newBook) => {
            this.books.push(newBook)
            this.#updateBooksInLocalStorage()
        })
    }
    #formBase64ThenDo(author, title, imgFile, callback) {
        const newBook = this.#makeBook(author, title)
        if (!imgFile) {
            return callback(newBook)
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            newBook.image = e.target.result
            callback(newBook)
        }
        reader.readAsDataURL(imgFile);
    }
    #makeBook(author, title){
        this.#last_idx++
        return {id: this.#last_idx, author, title}
    }
    deleteBookById(id){
        this.books = this.books.filter(book => book.id !== id)
        this.#updateBooksInLocalStorage()
    }
    updateBook(id, author, title, imgFile){
        const pos = this.#findBookById(id)
        const oldImg = this.books[pos].image
        this.#formBase64ThenDo(author, title, imgFile, (updatedBook) => {
            if (!imgFile){
                updatedBook.image = oldImg
            }
            this.books[pos] = updatedBook
            this.#updateBooksInLocalStorage()
        })
    }
    #findBookById(id){
        for (const idx in this.books){
            if (this.books[idx].id == id) {
                return idx
            }
        }
    }
}
export default new Books