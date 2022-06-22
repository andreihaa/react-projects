import React from "react";

function Multiply(props){
    function multiplyBy2(num){
        return num * props.multiplyBy; 
    }
    return <button
        onClick={function (){
            const numb = props.value;
            const newNumb = multiplyBy2(numb); 
            props.callback(newNumb); 
            props.addHistory(`number was ${props.value} after multiply, number is ${multiplyBy2(props.value)}`)
        }}
    >Multiply</button>
}

export default Multiply; 