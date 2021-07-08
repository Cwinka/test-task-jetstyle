import React, {useEffect} from "react"
import {BookList} from "./components/book_list"
import {CreateBook} from "./components/create_book"
import { noImageBase64 } from "./noimage"
import BooksStore from "./store/books"
import "./styles.css"

function fakeBooks() {
    const fake = [
        {id: 1, author: 'Robert Martin', title: 'Clean Code'},
        {id: 2, author: 'J. K. Rowling', title: 'Harry Potter and the Chamber of Secrets'},
        {id: 3, author: "Richard Scarry's", title: "Richard Scarry's Best Storybook Ever"},
        {id: 4, author: 'John Fowles', title: 'The Collector'},
        {id: 5, author: 'F. Dostoevsky', title: 'Crime and Punishment'},
        {id: 6, author: 'HR Giger', title: 'Giger'},
    ]
    for (const book of fake){
        book.image = noImageBase64
    }
    return fake
}

export default function App() {
    // setup
    useEffect(() => {
        const books = JSON.parse(localStorage.getItem('books'))
        if (!books || !books.length){
            BooksStore.setBooks(fakeBooks())
        } else {
            BooksStore.setBooks(books)
        }
    }, [])

    return <>
        <div className="task">
            <h1>Book list</h1>
            <CreateBook />
            <BookList />
        </div>
    </>
}