import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './QuickCart.css'
import { CartContext } from "../../components/context/CartContext";
import {IoIosCloseCircleOutline} from 'react-icons/io'

const QuickCart = (props) => {
    const { loading } = useFetch("/books");
    const { books, total, increaseProductToCart, decreaseProductToCart, removeProduct, clearCart, updateQuantity } = useContext(CartContext);
    const navigate = useNavigate()

    const handleInput = (event, product) => {
        console.log(product)
        const newQuantity = event.target.value
        // updateQuantity(product, newQuantity)
    }
    
    return (
        <div className='quickCartWrapper'>
            {loading? ("loading") : 
                (<div className="cartGrid">
                    {books?.map(( product, i ) =>{
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
                                <div className="priceQuantityRemoveWrapper">
                                    <div className="priceAndQuantityWrapper">
                                        <button className='minusButton' onClick={() => decreaseProductToCart(product)}>-</button>
                                        <div className='bookCartQuantity'>{product.quantity}</div>
                                        {/* <input
                                            type="number"
                                            defaultValue={product.quantity}
                                            onChange={(event) => handleInput(event, product)}
                                        /> */}
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
                </div>)
            }
            <div className='totalPriceAndButton'>
                <div className='totalPrice'>
                    <div className='totalPriceText'>Total Price</div>
                    <div className='totalPriceNumber'>{total} $</div>
                </div>
                <div className='buttonWrapper'>
                    <button className="goToCartButton" onClick={() => navigate('/cart')}>Go to cart</button>
                    <button className='clearCartButton' onClick={() => clearCart()}>Clear Cart</button>
                </div>
            </div>
        </div>
    )
}

export default QuickCart