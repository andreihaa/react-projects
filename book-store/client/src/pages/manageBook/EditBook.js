import axios from "axios";
import { useState } from "react";
import "./EditBook.css"

const EditBook = (props) => {
    const [editTitle, setEditTitle] = useState('');
    const [editPrice, setEditPrice] = useState(0);
    const [editAuthor, setEditAuthor] = useState('');
    const {setOpenEdit, product, handleSubmit} = props; 

    const handleEditButton = async (aBook) => {
        await axios.put(`/books/${aBook._id}`, {
            title: editTitle ? editTitle : aBook.title,
            author: editAuthor ? editAuthor : aBook.author,
            price: editPrice ? editPrice : aBook.price
        });
        setOpenEdit(false);
        handleSubmit(); 
    }

    return (
        <div className="editContainer">
            <div className="editOption">
                <div className="editOptionTitle">Title</div>
                <input 
                defaultValue={product.title}
                placeholder="book title" onChange={(e) => setEditTitle(e.target.value)}/>
            </div>
            <div className="editOption">
                <div className="editOptionAuthor">Author</div>
                <input 
                defaultValue={product.author}
                placeholder="book Author" onChange={(e) => setEditAuthor(e.target.value)}/>
            </div>
            <div className="editOption">
                <div className="editOptionPrice">Price</div>
                <input 
                defaultValue={product.price}
                placeholder="book Price" onChange={(e) => setEditPrice(e.target.value)}/>
            </div>
            <button className="editButton" onClick={() => {handleEditButton(product)}}>Add Changes</button>
        </div>
    )
}

export default EditBook; 