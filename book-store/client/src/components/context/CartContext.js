import { createContext, useEffect, useReducer } from "react";
import useFetch from "../../hooks/useFetch";

const INITIAL_STATE = {
    books: null,
    cartLoading: false,
    error: null,
    total: 0,
    totalQuantity: 0,
};

export const CartContext = createContext(INITIAL_STATE);

const CartReducer = (state, action) => {
  switch (action.type) {
    case "CART_FETCHING_START":
      return {
        books: null,
        total: 0,
        totalQuantity: 0, 
        cartLoading: true,
        error: null,
      };
    case "CART_FETCHING_SUCCESS": 
    case "CART_ADD":
    case "CART_REMOVE":
    case "CART_INCREASE":
    case "CART_DECREASE":
      return {
        books: action.payload.products,
        total: action.payload.total,
        totalQuantity: action.payload.totalQuantity, 
        cartLoading: false,
        error: null,
      };
    case "CART_FETCHING_FAILURE":
      return {
        books: [],
        cartLoading: false,
        total: 0,
        totalQuantity: 0, 
        error: action.payload,
      };
    case "CLEAR_CART":
      return {
        books: [],
        total: 0,
        totalQuantity: 0, 
        cartLoading: false,
        error: null,
      };
    case "IS_FAVORITE":
      return {
        books: action.payload.products,
        total: action.payload.total,
        totalQuantity: action.payload.totalQuantity, 
        cartLoading: false,
        error: null,
      };
    default:
      console.log("INITIAL STATE")
      return state;
  }
};


export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, INITIAL_STATE);
  const { data, loading : booksLoading } = useFetch("/books");
  
  let returnedProductsOnCart = []; 
  let total = 0; 
  let totalQuantity = 0; 

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

  const updateLocalStorage = (books) => {
    if(!books){
      return; 
    }
    let localStorageCart = books.map((book) => {
      return {
        id: book.data._id,
        quantity: book.quantity 
      }
    })
    localStorage.setItem('cartProduct', JSON.stringify(localStorageCart))
  }

  const increaseProductToCart = (product) => {
    const updatedProducts = state.books.map((book) => {
      if(product.data._id === book.data._id){
        book.quantity++;
      }
      return book; 
    });
    dispatch({
      type: "CART_INCREASE",
      payload: {
        products: updatedProducts,
        total: state.total + product.data.price,
        totalQuantity: state.totalQuantity + 1,
      }
    })
  }

  const decreaseProductToCart = (product) => {
    if(product.quantity === 1){
      removeProduct(product); 
    }
    else{
      const updatedProducts = state.books.map((book) => {
        if(product.data._id === book.data._id){
          book.quantity--;
        }
        return book; 
      });
      dispatch({
        type: "CART_DECREASE",
        payload: {
          products: updatedProducts,
          total: state.total - product.data.price,
          totalQuantity: state.totalQuantity - 1,
        }
      })
    }
  }

  const removeProduct = (product) => {
    const updatedProducts = state.books.filter((book) => {
      if(product.data._id !== book.data._id){
        return book; 
      }
    });
    dispatch({
      type: "CART_REMOVE",
      payload: {
        products: updatedProducts,
        total: state.total - product.data.price,
        totalQuantity: state.totalQuantity - 1,
      }
    })
  }

  const addProduct = (product) => {
    let bookFound = state.books.filter((item)=>item.data._id===product._id)[0];
    if(bookFound){
      increaseProductToCart(bookFound); 
    }
    else{
      const updatedProducts = [...state.books, {
        data: product,
        quantity: 1
      }];
      dispatch({
        type: "CART_ADD",
        payload: {
          products: updatedProducts,
          total: state.total + product.price,
          totalQuantity: state.totalQuantity + 1,
        }
      })
    }
  }

  const clearCart = () =>{
    dispatch({
      type: "CLEAR_CART",
    })
    localStorage.clear();
  }


  useEffect(() => { 
    if(booksLoading){
      return; 
    }
    dispatch({
      type: 'CART_FETCHING_START', 
    })
    data.forEach((book) =>{
      let bookFound = currentCartProducts.filter((item)=>item.id===book._id)[0]
      if(bookFound){
        returnedProductsOnCart.push({
          data: book, 
          quantity: bookFound.quantity
        })
        total = total + (book.price * bookFound.quantity); 
        totalQuantity = totalQuantity + bookFound.quantity; 
      }            
    });
    dispatch({
      type: "CART_FETCHING_SUCCESS",
      payload: {
        products: returnedProductsOnCart,
        total: total,
        totalQuantity: totalQuantity
      }
    }) 
  },[data])

  useEffect(() => {
    updateLocalStorage(state.books);
  }, [state.books])

  return (
    <CartContext.Provider
      value={{
        books: state.books,
        total: state.total,
        totalQuantity: state.totalQuantity,
        cartLoading: state.cartLoading,
        error: state.error,
        increaseProductToCart,
        decreaseProductToCart,
        addProduct,
        removeProduct,
        clearCart,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};