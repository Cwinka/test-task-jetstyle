import React from 'react'
import Book from "../book"
import CreateBook from "../create_book"

import style from './book_list.style.css'

export default function BookList({books_list}) {
    return <div className={style.books}>
        <CreateBook />
        <div className={style.list}>
            {books_list.map(book => 
                <Book book={book} />
            )}
        </div>
    </div>
}