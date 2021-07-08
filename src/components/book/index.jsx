import React, { useState } from "react"
import BooksStore from "../../store/books"
import style from "./book.style.css"

export const Book = React.memo( ({book}) => {
    const [toggled, setToggled] = useState(false);
    if (toggled){
        return <RedactBook book={book} closeRedact={() =>setToggled(false)}/>
    }

    return <div className={style.book}>
        <div className={style.info}>
            <div className={style.title}>{book.title}</div>
            <div className={style.author}>{book.author}</div>
        </div>
        <div>
            <button className="btn" onClick={() => BooksStore.deleteBookById(book.id)}>Delete</button>
            <button className="btn" onClick={() => setToggled(!toggled)}>Redact</button>
        </div>
    </div>
})

function RedactBook({book, closeRedact}) {
    const [author, setNewAuthor] = useState(book.author)
    const [title, setNewTitle] = useState(book.title)

    function update() {
        BooksStore.updateBook({id: book.id, author, title})
        closeRedact();
    }
    return <div className={style.book}>
        <div className={style.info}>
            <div>
                <input className={style.title} name="title" value={title} onChange={(e) => setNewTitle(e.target.value)}/>
            </div>
            <div>
                <input className={style.author} name="author" value={author} onChange={(e) => setNewAuthor(e.target.value)}/>
            </div>

        </div>
        <div>
            <button className="btn" onClick={update}>Save</button>
            <button className="btn" onClick={closeRedact}>Cancel</button>
        </div>
    </div>
}