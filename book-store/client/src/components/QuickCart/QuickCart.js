import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './QuickCart.css'
import { CartContext } from "../../components/context/CartContext";

const QuickCart = (props) => {
    const { data, loading } = useFetch("/books");
    const { books, total, dispatch, increaseProductToCart, decreaseProductToCart } = useContext(CartContext);
    
    return (
        <div className='quickCartWrapper' count={props.productsCount}>
            {loading? ("loading") : 
                (<div className="cartGrid">
                    {books.map(( product, i ) =>{
                        console.log('product', product); 
                    return (
                            <div className="bookCartCard" key={i}>  
                                <Link to={`/book/${product.data._id}`} className="link">   
                                    <img className="bookCartImg" src={product.data.photo}/>
                                </Link>
                                <div className="bookCartDetailWrapper">
                                    <div className='titleAndAuthorWrapper'>
                                        <div className="bookCartTitle">{product.data.title}</div>
                                        <div className="bookCartAuthor">{product.data.author}</div>
                                    </div>
                                    <div className="priceAndQuantityWrapper">
                                        <div className="bookCartPrice">{product.data.price}$</div>
                                        <div className="bookCartSpace">x</div>
                                        <button className='minusButton' onClick={() => decreaseProductToCart(product)}>-</button>
                                        <div className='bookCartQuantity'>{product.quantity}</div>
                                        <button className='plusButton' onClick={() => increaseProductToCart(product)}>+</button>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                    <div className='totalPrice'>
                        <div className='totalPriceText'>Total Price</div>
                        <div className='totalPriceNumber'>{total} $</div>
                    </div>
                </div>)
            }
        <Link to={`/cart}`}>
            <button className="goToCartButton">Go to cart</button>
        </Link>
        </div>
    )
}

export default QuickCart