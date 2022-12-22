import mongoose from 'mongoose'; 
 
const BookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    description:{
        type: String, 
        required: true
    },
    publisher:{
        type: String,
    },
    publicationDate:{
        type: Date,
    },
    pages:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        // required: true
    },
    aboutAuthor:{
        type: String,
    },
    photo:{
        type: String,
        // required: true
    },
    rating:{
        type: Number,
        min: 0,
        max: 5
    },
})

export default mongoose.model("Book", BookSchema)