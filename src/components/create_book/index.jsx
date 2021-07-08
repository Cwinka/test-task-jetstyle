import React, { useRef, useState } from "react";
import style from './create.style.css'
import BooksStore from "../../store/books"

export const CreateBook = () => {
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const imgRef = useRef()

    function create() {
        if (author && title) {
            const raw = imgRef.current.files?.length && imgRef.current.files[0]
            BooksStore.addBook(author, title, raw)
            setAuthor('')
            setTitle('')
        }
    }


    return <div className={style.create}>
        <label htmlFor="author">Author</label>
        <input type="text" className={style.input} name="author" value={author} onChange={(e) => setAuthor(e.target.value)}/>

        <label htmlFor="title">Title</label>
        <input type="text" className={style.input} name="title" value={title} onChange={(e) => setTitle(e.target.value)}/>

        <label htmlFor="image">Image</label>
        <input type="file" className={style.input} name="image" ref={imgRef}/>

        <button className="btn" onClick={create}>
            Add
        </button>
    </div>
}