import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import "./books.css"

const Books = (props) => {
    const { data, loading } = useFetch("/books");
    const {searchInput} = props; 

    const filteredUsers = useMemo(
        () => data.filter((book) => {
            return book.title.toLowerCase().includes(searchInput.toLowerCase());
          }),
        [searchInput, data]
    );

    function getFromLocalStorage(){
        let currentCartProducts;
        let localStorageCartString = localStorage.getItem('cartProduct'); 
        if(!localStorageCartString){
            currentCartProducts = []
        }
        else{
            currentCartProducts = JSON.parse(localStorageCartString);
        }
        return currentCartProducts; 
    }

    const handleAddToCart = (book) =>{
        let currentCartProducts = getFromLocalStorage(); 
        let productAndQuantity;

        let bookExist = currentCartProducts.some((item) => {
            return item.id === book._id;
        })
        if(!bookExist){
            productAndQuantity = {
                id: book._id,
                quantity: 1,
            } 
            currentCartProducts.push(productAndQuantity);
        }
        else{
            const currentBook = currentCartProducts.filter((item) => {
                return item.id === book._id; 
            })[0]; 
                currentBook.quantity= currentBook.quantity + 1; 
        }
        localStorage.setItem('cartProduct', JSON.stringify(currentCartProducts));
    }

    return (
        <div className="bookWrapper">
            {loading? ("loading") : 
                (<div className="bookGrid">
                    {filteredUsers.map(( book, i ) =>{
                    return (
                            <div className="bookCard" key={i}>  
                                <Link to={`/book/${book._id}`} className="link">   
                                    <img className="bookImg" src={book.photo}/>
                                </Link>
                                <div className="bookDetailWrapper container">
                                    <div className="bookTitle animated">{book.title}</div>
                                    <div>{book.author}</div>
                                    <div>{book.price} $</div>
                                    <button onClick={() => handleAddToCart(book)} className="addToCartButton">Add to cart</button>
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