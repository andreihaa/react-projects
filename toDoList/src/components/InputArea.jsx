import React, {useState} from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
    console.log(newValue);   
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button 
        onClick={() =>{
          if(inputText !== ''){
            props.onAdd(inputText)
          }
          else{
            alert('you have to insert input')
          }
        }}>
        <span>Add</span>
      </button>
    </div>
  );
}
  
export default InputArea;
