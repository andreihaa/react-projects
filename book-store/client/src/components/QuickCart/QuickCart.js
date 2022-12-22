import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './QuickCart.css'

const QuickCart = (props) => {
    const { data, loading } = useFetch("/books");
    const [productsOnCart, setProductsOnCart]= useState([])
    let productsCount; 


    const getFromLocalStorage = () => {
        let currentCartProducts;
        let localStorageCartString = localStorage.getItem('cartProduct'); 
        if(!localStorageCartString){
            currentCartProducts = []; 
        }
        else{
            currentCartProducts = JSON.parse(localStorageCartString);
        }
        return currentCartProducts; 
    }
    let currentCartProducts = getFromLocalStorage();

    // useEffect(() => () => {
    useEffect(() => { 
        data.forEach((book) =>{
            let bookFound = currentCartProducts.filter((item)=>item.id===book._id)[0]
            if(bookFound){
                console.log('bookFound', productsOnCart)
                if(productsOnCart.filter((item)=>item.id===book._id)[0]){
                    console.log('aici')
                    return; 
                }
                else{
                    const copyProductsOnCart = productsOnCart.concat({
                            book:book,
                            quantity: bookFound.quantity
                        }); 
                    setProductsOnCart(copyProductsOnCart
                        // productsOnCart => 
                        // 
                        // [...productsOnCart, {
                        // book:book,
                        // quantity:bookFound.quantity
                    // }])
                )}
            }           
            // productsCount = currentCartProducts.length; 
        });   
    },[data])
    
    return (
        <div className='quickCartWrapper' count={props.productsCount}>
            {loading? ("loading") : 
                (<div className="cartGrid">
                    {console.log('map',productsOnCart)} {productsOnCart.map(( product, i ) =>{
                    return (
                            <div className="bookCartCard" key={i}>  
                                <Link to={`/book/${product.book._id}`} className="link">   
                                    <img className="bookCartImg" src={product.book.photo}/>
                                </Link>
                                <div className="bookCartDetailWrapper">
                                    <div className='titleAndAuthorWrapper'>
                                        <div className="bookCartTitle">{product.book.title}</div>
                                        <div className="bookCartAuthor">{product.book.author}</div>
                                    </div>
                                    <div className="priceAndQuantityWrapper">
                                        <div className="bookCartPrice">{product.book.price}$</div>
                                        <div className="bookCartSpace">x</div>
                                        <div className='bookCartQuantity'>{product.quantity}</div>
                                    </div>
                                </div>
                            </div>)
                        })
                    }
                </div>)
            }
        <Link to={`/cart}`}>
            <button className="goToCartButton">Go to cart</button>
        </Link>
        </div>
    )
}

export default QuickCart