import { createContext, useEffect, useReducer, useState } from "react";
import useFetch from "../../hooks/useFetch";

const INITIAL_STATE = {
    books: [],
    cartLoading: false,
    error: null,
};

export const FavoriteContext = createContext(INITIAL_STATE);

const FavoriteReducer = (state, action) => {
    switch (action.type) {
      case "FAVORITE_FETCHING_START":
        return {
            ...state,
            favoriteLoading: true
        };
    case "FAVORITE_FETCHING_SUCCESS": 
        return {
          ...state,
          books: action.payload,
          favoriteLoading: false,
        };
    case "FAVORITE_FETCHING_FAILURE":
        return {
            ...state,
            favoriteLoading: false,
            error: action.payload
        };
    case "TOGGLE_FAVORITE":
        return {
            ...state,
            books: state.books.map(book => 
              book._id === action.payload._id ? 
              {...book, isFavorite: !book.isFavorite} : 
              book
            )
        };
    default:
        console.log("INITIAL STATE")
        return state;
    }
  };

  export const FavoriteContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(FavoriteReducer, INITIAL_STATE);
    const { data, loading : booksLoading } = useFetch("/books");
    const [favoriteToggled, setFavoriteToggled] = useState(false);
  
  let currentFavoriteProducts;
  const getFromLocalStorage = () => {
    let localStorageFavoriteString = localStorage.getItem('favoriteProduct'); 
    if(!localStorageFavoriteString){
      currentFavoriteProducts = []; 
    }
    else{
      currentFavoriteProducts = JSON.parse(localStorageFavoriteString);
    }
    return currentFavoriteProducts; 
  }
  currentFavoriteProducts = getFromLocalStorage();

  const updateLocalStorage = (books) => {
    if(!books){
      return; 
    }
    let localStorageFavorite = books.filter(book => book.isFavorite)
      .map((book) => {
        return {
          id: book._id,
          isFavorite: book.isFavorite
        }
      });
    localStorage.setItem('favoriteProduct', JSON.stringify(localStorageFavorite))
  }

  const toggleFavorite = (product) => {
    dispatch({
        type: "TOGGLE_FAVORITE",
        payload: product
    });
    setFavoriteToggled(true);
  };

  useEffect(() => {
    if(favoriteToggled){
        updateLocalStorage(state.books);
        setFavoriteToggled(false);
    }
  },[favoriteToggled])

  useEffect(() => { 
    if(booksLoading){
      return; 
    }
    dispatch({
      type: 'FAVORITE_FETCHING_START', 
    });

    let returnedProductsOnFavorites = data.map(book => {
      let bookFound = currentFavoriteProducts.filter((item)=>item.id===book._id)[0];
      return {
        ...book,
        isFavorite: bookFound ? bookFound.isFavorite : false
      }
    });
    dispatch({
      type: "FAVORITE_FETCHING_SUCCESS",
      payload: returnedProductsOnFavorites,
    });
  },[data])

  return (
    <FavoriteContext.Provider
      value={{
          books: state.books,
          favoriteLoading: state.cartLoading,
          error: state.error,
          toggleFavorite,
          dispatch,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}