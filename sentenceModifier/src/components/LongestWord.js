import React from "react"

function LongestWord(props){
    function everyWordLetterCount(string){
        const punctuationless = string
            .replace(/[.,/#!$%^&*;:{}=-_`~()]/g, "")
            .replace(/s{2,}/g, " ");
        const splitted = punctuationless.split(" ");
        let max = 0; 
        let word =""
        for(let i=0; i < splitted.length; i++){
            if(splitted[i].length > max){
                max = splitted[i].length;
                word = splitted[i];
            }
        }
        return `${max} characters and it is "${word}" :)`; 
    }
    return (
        <div>
            <header
                style= {{
                    fontSize: ".8rem solid",
                    letterSpacing: "1px"
                }}
                align= "left"
            >The longest word has:{everyWordLetterCount(props.input)}</header>
        </div>
    )
}
 
export default LongestWord; 