import { useState } from 'react';
import './AddBook.css'
import Modal from './Modal';
import axios from 'axios'
import useFetch from '../../hooks/useFetch';

const AddBook = (props) => {
    const {visible} = props; 
    const { data, setData } = useFetch("/books");
    const [bookTitle, setBookTitle] = useState('');
    const [bookAuthor, setBookAuthor] = useState('');
    const [bookDescription, setBookDescription] = useState('');
    const [bookPages, setBookPages] = useState(0);
    const [bookImage, setBookImage] = useState('');
    const [publicationDate, setBookPublicationDate] = useState();
    const [bookPublisher, setBookPublisher] = useState();
    const [bookPrice, setBookPrice] = useState(0);
    const [aboutAuthor, setAboutAuthor] = useState(''); 
    const [bookRating, setBookRating] = useState(0); 

    if(!visible) {
        return null;
    }

    console.log(publicationDate)

    const handleButton = async () => {
        const request = {
          title: bookTitle,
          author: bookAuthor,
          description: bookDescription,
          pages: bookPages,
          photo: bookImage,
          publicationDate: publicationDate,
          publisher: bookPublisher,
          price: bookPrice,
          aboutAuthor: aboutAuthor,
          rating: bookRating
        };
    
        const response = await axios.post("/books", request);
        setData([...data, response.data]);
        props.onClose();
        window.location.reload(true);
    }
    
    return (
        <Modal onClose={props.onClose}>
            <div className="bg">
                <div className="card">
                    <div className='title'>Book details</div>
                    <div className='bookDetailsGrid'>
                        <div className="bookModalTitleDiv">
                            <div className='bookTitleModal'>Book Title</div>
                            <input required type='text' placeholder="book title" onChange={(e) => setBookTitle(e.target.value)}/>
                        </div>
                        <div className="bookModalAuthorDiv">
                            <div className='bookAuthorModal'> Author</div>
                            <input type='text' required placeholder="book author" onChange={(e) => setBookAuthor(e.target.value)}/>
                        </div>
                        <div className="bookModalDescriptionDiv">
                            <div className='bookDescriptionModal'>Description</div>
                            <input type='text' className='descriptionModal' required placeholder="Description" onChange={(e) => setBookDescription(e.target.value)}/>
                        </div>
                        <div className="bookModalPagesDiv">
                            <div className='bookPagesModal'>Pages</div>
                            <input type='text' required placeholder="Pages" onChange={(e) => setBookPages(e.target.value)}/>
                        </div>
                    </div>
                    <div className='others'>Other Info</div>
                    <div className='bookOthersGrid'>
                        <div className="bookModalPublicationDiv">
                            <div className='bookPublicationDate'>Publication Date</div>
                            <input type='date' onChange={(e) => setBookPublicationDate(e.target.value)}/>
                        </div>
                        <div className="bookModalPublisherDiv">
                            <div className='bookPublisher'> Publisher</div>
                            <input type='text' placeholder="book publisher" onChange={(e) => setBookPublisher(e.target.value)}/>
                        </div>
                        <div className="bookModalRatingDiv">
                            <div className='bookRating'>Rating</div>
                            <input type='number' placeholder="photo" onChange={(e) => setBookRating(e.target.value)}></input>
                        </div>
                        <div className="bookModalPriceDiv">
                            <div className='bookPrice'>Price</div>
                            <input type='number' onChange={(e) => setBookPrice(e.target.value)}/>
                        </div>
                        <div className="bookModalAboutAuthorDiv">
                            <div className='aboutBookAuthor'> About Author</div>
                            <input type='text' placeholder="author" onChange={(e) => setAboutAuthor(e.target.value)}/>
                        </div>
                        <div className="bookModalImgDiv">
                            <div className='bookImage'> Photo</div>
                            <input type='text' placeholder="photo" onChange={(e) => setBookImage(e.target.value)}></input>
                        </div>
                    </div>
                    <button className='buttonModalInput' onClick={handleButton}>AddBook</button>
                </div>
            </div>  
        </Modal>
    )    
}

export default AddBook;
