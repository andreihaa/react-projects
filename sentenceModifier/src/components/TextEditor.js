import React from "react"; 

function TextEditor(props){
    return <div>
        <h1>Letter Count</h1>
        <textarea
            style= {{
                backgroundColor: "#fff",
                fontSize: ".8rem solid",
                color: "blue",
                lineHeight: "1.5",
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxShadow: "5px 5px 5px #999"
            }}
            placeholder= "type something here..."
            rows= "7"
            cols= "60"
            resize= "none"
            onChange={props.x}
        ></textarea>
    </div>
}
 
export default TextEditor;  