import React, { useState } from "react"
import TicTacToeButton from "../components/TicTacToeButton";

function TicTacToe(){
    const [buttons, setButton] = useState(createButtonsState())
    const [activePlayer, setActivePlayer] = useState('player1');

    function createButtonsState(){
        const button = []
        for(let i=0; i<3; i++){
            button[i] = []; 
            for(let j=0; j<3; j++){
                //[i=0,j=0]/[i=0, j=1]/[i=0,j=2]
                //[i=1,j=0]/[i=1, j=1]/[i=1, j=2]
                //[i=2,j=0]/[i=2, j=1]/[i=2,j=2]
                button[i].push({'state': 'none'})
            }
        }
        return button; 
    }
    
    function createButton(){
        const arrButtons = []
        for(let i=0; i<3; i++){
            for(let j=0; j<3; j++){
                arrButtons.push((<TicTacToeButton
                    name={{i,j}}
                    state={buttons[i][j].state}
                    onClick={clicked}
                />))
            }
            arrButtons.push((<br></br>))
            
        }
        return arrButtons
    }

    function clicked(i,j){
        const buttonCopy = [...buttons]; 
        buttonCopy[i] = [...buttons[i]];
        if(buttonCopy[i][j].state === 'none'){
            buttonCopy[i][j] = {'state': activePlayer}; 
            setActivePlayer(activePlayer === 'player1' ? 'player2' : 'player1');
            setButton(buttonCopy); 
        }
    }
    function checkLines(){
        for(let i=0; i < buttons.length; i++){
            let count = 0; 
            for(let j=0; j <buttons[i].length; j++){
                if(buttons[i][j].state === 'player1'){
                    count ++;
                }
                else if(buttons[i][j].state === 'player2'){
                    count --; 
                }
            }
            if(count === 3){
                return 'winner player 1'
            }
            else if(count === -3){
                return 'winner player 2'
            }
        }

    }
    function checkColumns(){
        for(let i=0; i < buttons.length; i++){
            let count = 0; 
            for(let j=0; j <buttons[i].length; j++){
                if(buttons[j][i].state === 'player1'){
                    count ++;
                }
                else if(buttons[j][i].state === 'player2'){
                    count --; 
                }
            }
            if(count === 3){
                return 'winner player 1'
            }
            else if(count === -3){
                return 'winner player 2'
            }
        }
    }
    function checkLeftDiagonal(){
        let count = 0; 
        for(let i=0; i < buttons.length; i++){
                if(buttons[i][i].state === 'player1'){
                    count ++;
                }
                else if(buttons[i][i].state === 'player2'){
                    count --; 
                }
            }
            if(count === 3){
                return 'winner player 1'
            }
            else if(count === -3){
                return 'winner player 2'
            }
    }

    function hasWinner(){
        let winner = checkLines(); 
        if(winner){
           return winner;
        }
        winner = checkColumns();
        if(winner){
            return winner;
        }
        winner = checkLeftDiagonal();
        if(winner){
            return winner;
        }
        return 'no winner yet'
    }

    return (
        <div>
            {createButton()}
            <div>{hasWinner()}</div>
        </div>
    )
}


export default TicTacToe; 
 
//tic tac toe gri - alternativ cum dai click, unu sa fie rosu si ramane rosu. 
//celalalt da click, se face albastru, ramane albastru
//in parinte trebuie sa tin minte a carui jucator e tura si cand se da click se schimba tura