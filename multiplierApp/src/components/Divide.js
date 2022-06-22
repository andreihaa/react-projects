import React from "react"; 

function Divide(props){
    function divideBy2(num){
        return num / props.divideBy; 
    }
    return <button
        onClick={
            function (){
                props.callback(divideBy2(props.value))
                props.addHistory(`number was ${props.value} after devide, number is ${divideBy2(props.value)}`)
            }
        }
    >Divide</button>
}

export default Divide;  