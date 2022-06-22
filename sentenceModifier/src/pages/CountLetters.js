import React from "react"; 
import TextEditor from '../components/TextEditor';
import { useState } from 'react';
import LetterCount from '../components/LetterCount';
import LongestWord from '../components/LongestWord';

function CountLetters(props){
    const [text, setText] = useState("")

    return (
        <div> 
            <TextEditor 
                x={event =>{
                setText(event.target.value)
                }}
            />
            <LongestWord 
                input = {text}
            />
            <LetterCount 
                input = {text}
            />
        </div>
    )
}

export default CountLetters; 