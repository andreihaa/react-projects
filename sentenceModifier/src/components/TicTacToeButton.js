import React, { useState } from 'react'

function TicTacToeButton(props){
    const [player, setPlayer] = useState('none'); 

    function changePlayer(){
        let player1 = false; 
        let player2 = false;
        if(props.state === 'clicked'){
            player1 = true; 
            player2 = false; 
        }
    }
    function changeColor(){
        if(props.state === 'none'){
            return 'grey'
        }
        else if(props.state === 'player1'){
            return 'red';
        }
        return 'blue'; 
    }

    return (
        <button
            disabled={props.state === 'clicked'}
            style={{'backgroundColor': changeColor()}}
            onClick={() =>{
                props.onClick(props.name.i, props.name.j)
            }}
        >
            {props.name.i},{props.name.j}
        </button>
    )
}


export default TicTacToeButton; 