import './Homescreen.css'
import readForLife from "../../img/bookstore.jpg"
import cart from "../../img/cart.png"
import Books from '../Books/Books'
import BookOfTheYear from '../bookOfTheYear/BookOfTheYear'
import Search from '../search/Search'
import { useContext, useState } from 'react'
import QuickCart from '../QuickCart/QuickCart'
import { CartContext } from "../../components/context/CartContext";


const Homescreen = (props) => {
    const [typedInput, setTypedInput] = useState('');
    const [openCart, setOpenCart] = useState(false); 
    const {productsCount} = props; 
    const {totalQuantity} = useContext(CartContext);
    return (
        <div className='homeBigWrapper'>
            <div className='homeContainer'>
                <div className='homeTitleWrapper'>
                    <div className='homeWrapper'>
                        <h2 className='homeTitle'>Home</h2>
                        <div className='cartWrapper'>
                            <img src={cart} className='cartImg' onClick={()=>setOpenCart(!openCart)}/>
                            <div className='cartBubbleOrange'>{totalQuantity}</div>
                            {openCart && <QuickCart count={productsCount}/>}
                        </div>
                    </div>
                    <Search 
                        onChange={e => setTypedInput(e.target.value)}
                    />
                </div>
                <div className='readForLifeWrapper'>
                    <img src={readForLife} className="readForLifeImg"/>
                    <div className="readForLifeText">Reading for Life</div>
                </div>
                <Books 
                    searchInput={typedInput}
                />     
            </div>
            <BookOfTheYear/>
        </div>
    )
} 

export default Homescreen; 