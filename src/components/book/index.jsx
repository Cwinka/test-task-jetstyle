import React, { useContext, useState } from "react"
import { BooksContext } from '../../context'
import style from "./book.style.css"

export default function Book({book}) {
    const {deleteBookById} = useContext(BooksContext);
    const [toggled, setToggled] = useState(false);

    if (toggled){
        return <RedactBook book={book} closeRedact={() =>setToggled(false)}/>
    }

    return <div className={style.book}>
        <div className={style.info}>
            <div className={style.title}>{book.title}</div>
            <div className={style.author}>{book.author}</div>
        </div>
        <button className="btn" onClick={() => deleteBookById(book.id)}>Delete</button>
        <button className="btn" onClick={() => setToggled(!toggled)}>Redact</button>
    </div>
}

function RedactBook({book, closeRedact}) {
    const {updateBook} = useContext(BooksContext);
    const [author, setNewAuthor] = useState(book.author)
    const [title, setNewTitle] = useState(book.title)

    function update() {
        updateBook({
            id: book.id, author, title})
            closeRedact();
    }
    return <div className={style.redact}>
        <div className={style.info}>
            <label htmlFor="author">Author</label>
            <input className={style.input} name="author" value={author} onChange={(e) => setNewAuthor(e.target.value)}/>

            <label htmlFor="title">Title</label>
            <input className={style.input} name="title" value={title} onChange={(e) => setNewTitle(e.target.value)}/>
        </div>
        <button className="btn" onClick={update}>
            Save
        </button>
        <button className="btn" onClick={closeRedact}>
            Cancel
        </button>
    </div>
}