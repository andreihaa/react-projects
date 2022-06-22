import React, {useState} from 'react';
import ToDoListInputBox from './ToDoListInputBox';

function CreateToDoList(props){
    const [items, setItems] = useState([])

    function addItem(text){
        setItems(prevItems =>{
            return [...prevItems, text]
        })
    }
    return (
        <div>
            <ToDoListInputBox
                onAdd={addItem} 
            />
            <ul>
                {items.map((item, index)=>(
                    <li
                    index={index}
                    key={index}
                    >{item}</li>
                ))}
            </ul>
        </div>
    )
}



export default CreateToDoList;

//trebuie promise ca sa le execute in ordine pentru a nu executa map de fiecare data cand se intampla handlechange? 
