import React, { useState } from "react";

function LetterCount(props){
    function countLetter(string){
        let lowercased = string.toLowerCase()
        let stringObj ={}
        for(let i=0; i<lowercased.length; i++){
            if(lowercased[i] !== " "){
                if(!stringObj[lowercased[i]]){
                    stringObj[lowercased[i]] = 1;
                }
                else{
                    stringObj[lowercased[i]]++;
                }
            }
        }
        return stringObj; 
    }
 
    function buildTable(obj){
        const keys = Object.keys(obj); 
        const tableRows = []; 
        for(let i=0; i<keys.length; i++){
            tableRows.push((
                <tr>
                    <td>
                        {keys[i]}
                    </td>
                    <td>
                        {obj[keys[i]]}
                    </td>
                </tr>
               
            ))
        }
        return tableRows;
    }
    function totalLetters(obj){
        let count = 0;
        const values = Object.values(obj)
        for(let i=0; i < values.length; i++){
            count = count + values[i]
        }
        return count;
    }

    return (
        
        <div>
            <table 
                align= "center"
                border= "0.5px solid"
            >
                <thead
                     backgroundColor= "red"
                     color= "#fff"
                >
                    <th scope="col">Letter</th>
                    <th scope="col">Count</th>
                    {buildTable(countLetter(props.input))}
                </thead> 
                <tfoot>
                    <tr>
                        <th scope="col">Total</th>
                        <th scope="col">{totalLetters(countLetter(props.input))}</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}

export default LetterCount;



