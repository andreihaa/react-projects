import { Navbar } from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./ManageBook.css"
import edit from '../../img/edit.svg'
import trash from '../../img/trash.svg'
import search from '../../img/search-black.png'
import axios from 'axios'
import { useState } from "react";
import AddBook from "./AddBook";

const ManageBook = () => {
    const { data, setData, loading, error } = useFetch("/books");
    const [isVisible, setIsVisible] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); 
    const [editTitle, setEditTitle] = useState('');
    const [editPrice, setEditPrice] = useState(0);
    const [editAuthor, setEditAuthor] = useState('');

    const handleDelete = async (id) =>{
        await axios.delete(`/books/${id}`);
        const newBookList = data.filter((book) => {
            return book._id !== id;
        });
        setData(newBookList);
    }


    const handleAdd = () => {
        setIsVisible(true)
    }

    const handleClose = () => {
        setIsVisible(false)
    }

    const handleEditButton = async (aBook) => {
        console.log(aBook)
        const response = await axios.put(`/books/${aBook._id}`, {
            title: editTitle ? editTitle : data.title,
            author: editAuthor ? editAuthor : data.author,
            price: editPrice ? editPrice : data.price
        });
        setOpenEdit(false);
    }

    return (
        <div className="manageBookPageWrapper">
            <AddBook visible={isVisible} onClose={handleClose}/>
            <Navbar/>
            <div className="pageWrapper">
                <div className="inputWrapper">
                    <input type="text" placeholder="search" className="searchBook"/>
                    <img src={search} className="searchBookIcon"/>
                    <button className="addButton" onClick={handleAdd}>+ Add Book</button>
                </div>
                <div className="tableHead">
                            <div className="tableBookTitle">Book Title</div>
                            <div className="author"> Author</div>
                            <div className="price"> Price</div>
                            <div className="action"> Action</div>
                        </div>
                <div className="manageBookWrapper">
                {loading? ("loading") : 
                    (<div className="manageBookGrid">
                        {data && data.map(( _book, i ) =>{
                        return <div className="manageBookCard" key={i}>       
                                    <img className="manageBookImg" src={_book.photo}/>
                                    <div className="manageBookDetailWrapper">
                                        <div className="manageBookTitle">{_book.title}</div>
                                        <div className="manageBookAuthor">{_book.author}</div>
                                        <div className="manageBookPrice">{_book.price} $</div>
                                    </div>
                                    <div className="actions">
                                        <span className="editModal">
                                            <img src={edit} className="editImg" onClick={()=>setOpenEdit(!openEdit)}/>
                                            {openEdit && 
                                                <div className="editContainer">
                                                    <div className="editOption">
                                                        <div className="editOptionTitle">Title</div>
                                                        <input 
                                                        defaultValue={_book.title}
                                                        placeholder="book title" onChange={(e) => setEditTitle(e.target.value)}/>
                                                    </div>
                                                    <div className="editOption">
                                                        <div className="editOptionAuthor">Author</div>
                                                        <input 
                                                        defaultValue={_book.author}
                                                        placeholder="book Author" onChange={(e) => setEditAuthor(e.target.value)}/>
                                                    </div>
                                                    <div className="editOption">
                                                        <div className="editOptionPrice">Price</div>
                                                        <input 
                                                        defaultValue={_book.price}
                                                        placeholder="book Price" onChange={(e) => setEditPrice(e.target.value)}/>
                                                    </div>
                                                    <button className="editButton" onClick={() => {handleEditButton(_book)}}>Add Changes</button>
                                                </div>}
                                        </span>
                                        <img src={trash} className="deleteImg" onClick={() => {handleDelete(_book._id)}}/>
                                    </div>
                                </div>
                            })
                        }
                    </div>)
                }
                </div>
            </div>
        </div>
    )
}

export default ManageBook; 