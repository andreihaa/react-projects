import React, { useState, useEffect } from "react"; 
import Multiply from "./components/Multiply";
import Divide from "./components/Divide";
import Increment from "./components/Increment"

function App() {

  const [number, setNumber] = useState(1)
  const [list, setList] = useState([])
  const [input, setInput] = useState()
  const [name, setName] = useState()
  
  const response = async () => {
    const res = await fetch('http://localhost:4000/home')
    const data = await res.json()
    setName(data.name)
  }

  useEffect(response, [])
  
  function changeHistory (historyItem){
    setList(list.concat(historyItem))
  }

  return (
    <div className="App">
      <input
        type= "number"
        onChange={function handleChange(event){
          setInput(event.target.value); 
        }}
      ></input>
      <Multiply 
        callback = {setNumber}
        value = {number}
        addHistory = {changeHistory}
        multiplyBy = {input}
      />
      <Divide 
        callback = {setNumber}
        value = {number}
        addHistory = {changeHistory}
        divideBy = {input}
      />
      <Increment 
        callback = {setNumber}
        value = {number}
        addHistory = {changeHistory}
        incrementBy = {input}
      />
      <div>{number}</div>
      <ul>
        {list.map((el) =>{
          return (<li>{el}</li>)
        })}
      </ul>
      <div>{name}</div>
    </div>
  );
}

export default App;
