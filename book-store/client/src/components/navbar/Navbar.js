import "./navbar.css"
import logoBook from "../../img/logo-full.jpg"
import search from "../../img/search.svg"
import home from "../../img/home.svg"
import recommendation from "../../img/recommendation.svg"
import author from "../../img/user.svg"
import favorites from "../../img/heart.svg"
import manageBooks from "../../img/book-open.svg"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"



export const Navbar = () => {
    const navigate = useNavigate(); 

    const getFromLocalStorage = () => {
        let user;
        let storedUser = localStorage.getItem('user'); 
        if(!storedUser){
            user = []; 
        }
        else{
            user = JSON.parse(storedUser);
        }
        return user; 
    }

    console.log(axios.defaults.baseURL) 

    const checkIfAdmin = async () => {
        console.log("Sending request to /isAdmin");
        try {
            const response = await axios.get('/isAdmin');
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };
    
    checkIfAdmin();
    // console.log(admin);

    const handleClick = () =>{
        let loggedInUser = getFromLocalStorage(); 
        console.log(loggedInUser)
        if(loggedInUser._id === '63612c08c9b3f3c524b2330a'){
            navigate("/manage-book")
        }
        else{ 
            alert('not authorized')
        }
    }

    return (
        <div className="navbar">
            <div className="navbarContainer">
                <div className="logo">
                    <img className="logoImg" src={logoBook} alt="logo svg"/>                    
                </div>
                <div className="navbarLinks">
                    <Link to={`/`} className="homeLink">
                        <div className="home">
                            <img className="homeImg" src={home} alt="home svg"/>
                            <div className="homeText">Home</div>
                        </div>
                    </Link>
                    <div className="discover">
                        <img className="searchImg" src={search} alt="search svg"/>
                        <div className="discoverText">Discover</div>
                    </div>
                    <div className="recommendations">
                        <img className="recommendationsImg" src={recommendation} alt="recommendations svg"/>
                        <div className="recommendationsText">Recommendations</div>
                    </div>
                    <div className="authors">
                        <img className="authorImg" src={author} alt="author svg"/>
                        <div className="authorsText">Authors</div>
                    </div>
                    <Link to={`/favorites`} className="homeLink">
                        <div className="favorites">
                            <img className="favoritesImg" src={favorites} alt="favourites svg"/>
                            <div className="favoritesText">Favorites</div>
                        </div>
                    </Link>
                    <div className="manageBooks">
                        <img className="manageBooksImg" src={manageBooks} alt="manage booking svg"/>
                        <div className="manageBooksText" onClick={handleClick}>Manage Book</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// export default Navbar; 