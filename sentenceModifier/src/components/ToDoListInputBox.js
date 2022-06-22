import React, {useState} from "react"

function ToDoListInputBox(props){
    const [text, setText] = useState('')

    return (
        <div>
            <input
                onChange={(event) =>{
                    setText(event.target.value)
                }}
            >
            </input>
            <button
                onClick={() =>{
                    props.onAdd(text)
                    setText('')
                }}
            >
                Add
            </button>
            
        </div>
    )
}

export default ToDoListInputBox; 