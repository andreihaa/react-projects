import useFetch from '../../hooks/useFetch';
import './BookOfTheYear.css'

const BookOfTheYear = () => {
    const { data, loading, error } = useFetch("/books");
    const filteredData = data.filter((book) => {
        if(book.rating > 4){
            return book; 
        }
    })

    const highestRating = filteredData.sort(function(a,b) {
        return b.rating - a.rating; 
    })

    return (
        <div className='bookOfTheYearWrapper'> 
            {loading? ("loading") : 
                (<div className="bookOfTheYearGrid">
                    <p>Books of the Year</p>
                    {data && highestRating.map(( book, i ) =>{
                            return <div className="bookOfTheYearCard" key={i}>       
                                <img className="bookOfTheYearImg" src={book.photo}/>
                                <div className="bookOfTheYearDetailWrapper">
                                    <div className="bookOfTheYearTitle">{book.title}</div>
                                    <div className="bookOfTheYearTitle">{book.author}</div>
                                </div>
                            </div>
                        })
                    }
                </div>)
            }
        </div>
    )
}

export default BookOfTheYear;