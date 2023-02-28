import { useContext, useMemo, useState} from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { CartContext } from "../../components/context/CartContext";
import "./books.css"
import { FavoriteContext } from "../context/FavoriteContext";

const Books = (props) => {
    const { data, loading } = useFetch("/books");
    const { searchInput } = props; 
    const { addProduct } = useContext(CartContext);
    const { toggleFavorite, books } = useContext(FavoriteContext);

    const filteredBooks = useMemo(
        () => data.filter((book) => {
            return book.title.toLowerCase().includes(searchInput.toLowerCase());
          }),
        [searchInput, data]
    );

    return (
        <div className="bookWrapper">
            {loading? ("loading") : 
                (<div className="bookGrid">
                    {filteredBooks.map(( book, i ) =>{
                    return (
                            <div className="bookCard" key={i}>  
                                <Link to={`/book/${book._id}`} className="link">   
                                    <img className="bookImg" src={book.photo}/>
                                </Link>
                                <div className="bookDetailWrapper container">
                                    <div className="bookTitle animated">{book.title}</div>
                                    <div>{book.author}</div>
                                    <div>{book.price} $</div>
                                    <button onClick={() => addProduct(book)} className="addToCartButton">Add to cart</button>
                                    <button onClick={() => toggleFavorite(book)} className="favouriteButton">
                                        {books.find(b => b._id === book._id)?.isFavorite === true ? <div className="heartRed">❤️</div> : <div className="heartWhite">🤍</div>}
                                    </button>
                                </div>
                            </div>)
                        })
                    }
                </div>)
            }
        </div>
    )
}
 
export default Books; 