import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../components/context/CartContext';
import { Navbar } from '../../components/navbar/Navbar';
import useFetch from '../../hooks/useFetch';
import './Cart.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import Footer from '../../components/footer/Footer';

const Cart = () => {
    const { loading } = useFetch("/books");
    const {books, total, increaseProductToCart, decreaseProductToCart, removeProduct, clearCart, totalQuantity} = useContext(CartContext); 
    const navigate = useNavigate()
    
    return (
        <div className='cartBigWrapper'>
            <Navbar />
            <div className='cartPageContainer'>
                <div className='cartPageWrapper'>
                    {books?.map((product, i) => {
                        return (
                            <div className="bookCartPageCard" key={i}>  
                                    <img className="bookCartImg" src={product.data.photo} onClick={()=>navigate(`/book/${product.data._id}`)}/>
                                <div className="bookCartDetailWrapper">
                                    <div className='titleAndAuthorWrapper'>
                                        <div className="bookCartTitle">{product.data.title}</div>
                                        <div className="bookCartAuthor">{product.data.author}</div>
                                    </div>
                                    <div className="priceQuantityRemoveWrapper">
                                        <div className="priceAndQuantityWrapper">
                                            <button className='minusButton' onClick={() => decreaseProductToCart(product)}>-</button>
                                            <div className='bookCartQuantity'>{product.quantity}</div>
                                            <button className='plusButton' onClick={() => increaseProductToCart(product)}>+</button>
                                            <div className="bookCartSpace">x</div>
                                            <div className="bookCartPrice">{product.data.price} $</div>
                                        </div>
                                        <div className='removeButtonCartPage'>
                                            <IoIosCloseCircleOutline 
                                                onClick={()=> removeProduct(product)}
                                                className='removeIcon'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>
                <div className='totalAndButtonWrapper'>
                    <div className='totalPriceCartPage'>
                            <div className='totalPriceTextCartPage'>Total: {totalQuantity} products </div>
                            <div className='totalPriceNumberCartPage'>Price {total} $</div>
                    </div>
                    <div className='buttonWrapperCartPage'>
                        <button className="goToCartButton" onClick={() => navigate('/cart')}>Go to payment</button>
                        <button className='clearCartButton' onClick={() => clearCart()}>Clear Cart</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Cart; 