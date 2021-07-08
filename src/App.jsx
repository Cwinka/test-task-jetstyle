import React, {useEffect} from "react"
import {BookList} from "./components/book_list"
import {CreateBook} from "./components/create_book"
import BooksStore from "./store/books"
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
    // setup
    useEffect(() => {
        BooksStore.setBooks(fakeBooks())
    }, [])

    return <>
        <div className="task">
            <h1>Book list</h1>
            <CreateBook />
            <BookList />
        </div>
    </>
}