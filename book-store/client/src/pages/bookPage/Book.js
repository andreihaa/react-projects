import { useLocation } from "react-router-dom"
import useFetch from "../../hooks/useFetch";
import './Book.css'
import { Navbar } from "../../components/navbar/Navbar"

const Book = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const { data, setData, loading, error } = useFetch(`/books/${id}`);

    return (
        <div className="singleBookContainer">
            <Navbar/>
            <div className="singleBookGrid">
                <div className="bookImg">
                    <img src={data.photo} className="imgSingleBook"/>
                </div>
                <div className="singleBookDetails">
                    <div className="bookImportantDetails">
                        <div className="singleBookTitle">{data.title}</div>
                        <div className="singleBookAuthor">by {data.author}</div>
                        <div className="singleBookDescription">{data.description}</div>
                    </div>
                    <div className="tableDiv">
                        <table>
                            <tr>
                                <td>Publisher</td>
                                <td>:</td>
                                <td>{data.publisher ? data.publisher : 'NA'}</td>
                            </tr>
                            <tr>
                                <td>Publication Date</td>
                                <td>:</td>
                                <td>{data.publicationDate ? data.publicationDate : 'NA'}</td>
                            </tr>
                            <tr>
                                <td>Pages</td>
                                <td>:</td>
                                <td>{data.pages}</td>
                            </tr>
                            <tr>
                                <td>About Author</td>
                                <td>:</td>
                                <td>{data.aboutAuthor ? data.aboutAuthor : 'NA'}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="singleBookPrice"> Price {data.price} $</div>
                </div>
            </div>
        </div>
    )
}

export default Book; 