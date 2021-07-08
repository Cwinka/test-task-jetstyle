import React, { useState } from "react";
import style from './create.style.css'
import BooksStore from "../../store/books"

export const CreateBook = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')

    function create() {
        if (author && title) {
            BooksStore.addBook(author, title)
            setAuthor('')
            setTitle('')
        }
    }

    return <div className={style.create}>
        <label htmlFor="author">Author</label>
        <input className={style.input} name="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>

        <label htmlFor="title">Title</label>
        <input className={style.input} name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <button className="btn" onClick={create}>
            Add
        </button>
    </div>
}