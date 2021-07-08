import React, {useEffect, useState} from "react"
import BookList from "./components/book_list"
import {BooksContext} from './context'
import "./styles.css"

function fakeBooks() {
    return [
        {id: 1, author: 'Robert Martin', title: 'Clean Code'},
        {id: 2, author: 'J. K. Rowling', title: 'Harry Potter and the Chamber of Secrets'},
        {id: 3, author: "Richard Scarry's", title: "Richard Scarry's Best Storybook Ever"},
        {id: 4, author: 'John Fowles', title: 'The Collector'},
        {id: 5, author: 'F. Dostoevsky', title: 'Crime and Punishment'},
        {id: 6, author: 'HR Giger', title: 'Giger'},
    ]
}

export default function App() {
    const [books, setBooks] = useState([]);
    // setup
    useEffect(() => {
        const fakebooks = fakeBooks()
        updateBooks(fakebooks)
    }, [])

    function updateBooks(books){
        setBooks(books)
        localStorage.setItem('books', JSON.stringify(books))
    }

    function findBookById(id){
        for (const idx in books){
            if (books[idx].id == id) {
                return idx
            }
        }
    }
    function addBook(book){
        let lastId = 0
        if (books.length) {
            lastId = books[books.length -1].id
        }
        console.log(lastId);
        book.id = lastId + 1
        const newBooks = [...books, book]
        updateBooks(newBooks)
        
    }
    function deleteBookById(id){
        const newBooks = books.filter(book => book.id !== id)
        updateBooks(newBooks)
    }
    function updateBook(updatedBook){
        const pos = findBookById(updatedBook.id)
        const newBooks = [...books]
        newBooks[pos] = updatedBook
        updateBooks(newBooks)
    }

    return <>
        <div className="task">
            <h1>Book list</h1>
            <BooksContext.Provider value={{
                addBook, deleteBookById, updateBook
            }}>
                <BookList books_list={books}/>
            </BooksContext.Provider>
        </div>
    </>
}