import { Navbar } from "../../components/navbar/Navbar";
import useFetch from "../../hooks/useFetch";
import "./ManageBook.css"
import edit from '../../img/edit.svg'
import trash from '../../img/trash.svg'
import search from '../../img/search-black.png'
import axios from 'axios'
import { useState } from "react";
import AddBook from "./AddBook";
import EditBook from "./EditBook";

const ManageBook = () => {
    const { data, setData, loading, reFetch } = useFetch("/books");
    const [isVisible, setIsVisible] = useState(false);
    const [openEdit, setOpenEdit] = useState(false); 
    const [clickedBook, setClickedBook] = useState()

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

    const handleEditClick = (book) => {
        setOpenEdit(!openEdit); 
        setClickedBook(book);
    }

    return (
        <div className="manageBookPageWrapper">
            <AddBook visible={isVisible} onClose={handleClose}/>
            <Navbar/>
            <div className="pageWrapper">
                <div className="inputWrapper">
                    <input type="text" placeholder="search" className="searchBook"/>
                    <img src={search} className="searchBookIcon" alt='search book icon'/>
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
                                    <img className="manageBookImg" src={_book.photo} alt='manage book icon'/>
                                    <div className="manageBookDetailWrapper">
                                        <div className="manageBookTitle">{_book.title}</div>
                                        <div className="manageBookAuthor">{_book.author}</div>
                                        <div className="manageBookPrice">{_book.price} $</div>
                                    </div>
                                    <div className="actions">
                                        <span className="editModal">
                                            <img src={edit} 
                                                className="editImg" 
                                                onClick={()=>{handleEditClick(_book)}} 
                                                alt='button for edit'/>
                                            {openEdit && <EditBook 
                                                openEdit={openEdit}
                                                product={clickedBook}
                                                setOpenEdit={setOpenEdit}
                                                handleSubmit={() => reFetch()}
                                            />}
                                        </span>
                                        <img alt='icon for delete' src={trash} className="deleteImg" onClick={() => {handleDelete(_book._id)}}/>
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