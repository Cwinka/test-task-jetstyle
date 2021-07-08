import { makeAutoObservable } from "mobx"

class Books {
    books = new Array
    #last_idx = 0
    constructor() {
        makeAutoObservable(this);
    }
    #updateBooks(){
        localStorage.setItem('books', JSON.stringify(this.books))
    }
    #findBookById(id){
        for (const idx in this.books){
            if (this.books[idx].id == id) {
                return idx
            }
        }
    }
    #make_book(author, title){
        this.#last_idx++
        return {id: this.#last_idx, author, title}
    }

    setBooks(books_list) {
        this.books = books_list
        this.#last_idx = books_list.length - 1
        this.#updateBooks()
    }
    addBook(author, title){
        const newBook = this.#make_book(author, title)
        this.books.push(newBook)
        this.#updateBooks()
    }
    deleteBookById(id){
        this.books = this.books.filter(book => book.id !== id)
        this.#updateBooks()
    }
    updateBook(updatedBook){
        const pos = this.#findBookById(updatedBook.id)
        this.books[pos] = updatedBook
        this.#updateBooks()
    }
}
export default new Books