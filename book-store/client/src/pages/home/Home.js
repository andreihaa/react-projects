import Homescreen from "../../components/homescreen/Homescreen";
import { Navbar } from "../../components/navbar/Navbar";
import "./Home.css"



const Home = () => {
    return (
        <div className="homeWrapperMain">
            <Navbar/>
            <Homescreen/>
        </div>
    )
}

export default Home; 