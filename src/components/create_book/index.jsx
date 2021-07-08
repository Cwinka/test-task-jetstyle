import React, { useContext, useState } from "react";
import { BooksContext } from "../../context";
import style from './create.style.css'


export default function CreateBook() {
    const {addBook} = useContext(BooksContext)
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')

    function create() {
        if (author && title) {
            addBook({author, title})
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