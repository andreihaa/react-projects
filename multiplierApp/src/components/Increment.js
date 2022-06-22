import React from "react"; 

function Increment(props){
    function incrementBy1(num){
        return num + Number(props.incrementBy); 
    }
    return <button
        onClick={function (){
            props.callback(incrementBy1(props.value));
            props.addHistory(`number was ${props.value} after increment, number is ${incrementBy1(props.value)}`)
        }}
    >Increment</button>
}

export default Increment; 