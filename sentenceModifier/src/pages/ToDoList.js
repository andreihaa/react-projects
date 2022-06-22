import React, { useState } from "react"
import CreateToDoList from "../components/CreateToDoList"

function ToDoList(props){
    const [text, setText] = useState('')
    return(
        <div>
            <h1>To Do List</h1>
            <CreateToDoList />
        </div>
    )
}

export default ToDoList;

