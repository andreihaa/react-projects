import "./Favorites.css"
import { useContext } from "react";
import { FavoriteContext } from "../../components/context/FavoriteContext";
import { Navbar } from "../../components/navbar/Navbar";
import search from '../../img/search-black.png'

const Favorites = () => {
    const { toggleFavorite, books } = useContext(FavoriteContext);

    const favoriteBooks = books.filter((book) => {
        return book.isFavorite === true
    });

    return (
        <div className="manageBookPageWrapper">
            <Navbar />
            <div className="pageWrapper">
                <div className="inputFavoriteWrapper">
                    <input type="text" placeholder="search" className="searchFavoriteBook"/>
                    <img src={search} className="searchBookFavoritePageIcon" alt='search book icon'/>
                </div>
                <div className="tableHead">
                            <div className="tableBookTitle">Book Title</div>
                            <div className="author"> Author</div>
                            <div className="price"> Price</div>
                        </div>
                <div className="manageBookWrapper">
                    <div className="manageBookGrid">
                        {favoriteBooks.map(( _book, i ) =>{
                        return <div className="manageBookCard" key={i}>       
                                    <img className="manageBookImg" src={_book.photo} alt='manage book icon'/>
                                    <div className="manageBookDetailWrapper">
                                        <div className="manageBookTitle">{_book.title}</div>
                                        <div className="manageBookAuthor">{_book.author}</div>
                                        <div className="manageBookPrice">{_book.price} $</div>
                                    </div>
                                    <button onClick={() => toggleFavorite(_book)} className="favouriteButton">
                                        {books.find(b => b._id === _book._id)?.isFavorite === true ? <div className="heartRed">❤️</div> : <div className="heartWhite">🤍</div>}
                                    </button>
                                </div>
                            })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Favorites; 