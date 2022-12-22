import './Search.css'
import search from "../../img/search-black.png"

const Search = (props) => {

    return (
        <div>
            <input className='searchBox' type="search" placeholder='search book' onChange={props.onChange}/>
            <div className="searchImgWrapper">
                <img src={search} className="searchIcon"/>
            </div>
        </div>
    )
}

export default Search; 