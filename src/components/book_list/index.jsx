import React from 'react'
import {Book} from "../book"
import BooksStore from "../../store/books"
import { observer } from "mobx-react-lite";

import style from './book_list.style.css'

export const BookList = observer( () => {

    return <div className={style.books}>
        <div className={style.list}>
            {BooksStore.books.map(book => 
                <Book book={book} />
            )}
        </div>
    </div>
})