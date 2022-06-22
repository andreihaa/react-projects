import React, {useLayoutEffect, useState} from "react";
import '../index.css'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const API_KEY = '5iamywTjDPb1EDQZW88Dzbe4iaGrPb7l'
const API_KEY_TENOR = '6DBHDIH0VC17'

function InputBox(props){
    const [input, setInput]= useState("")
    const [explanations, setExplanations]= useState([])
    const [giphy, setGiphy] = useState([]); 
    const [format, setFormat] = useState('');

    console.log(format)

    return (
        <div  className='container'>
            <input 
                className= "input"
                type = "text"
                align= 'left'
                onChange ={event =>{
                    setInput(event.target.value)
                    }}
            > 
            </input>
            <button
                className= "button"
                onClick = {function getLink(){
                    const modifiedURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + input; 
                    fetch(modifiedURL)
                        .then((res) =>{
                            return res.json()
                        })
                        .then((res) =>{
                            const explanation=[];
                            res.forEach((element) => {
                                element.meanings.forEach((meaning) =>{
                                    meaning.definitions.forEach((def) =>{
                                        explanation.push(def.definition)
                                    })
                                })
                            })
                            setExplanations(explanation);
                        })
                    }
                }
            >Search</button>
            <button
                className= "button"
                onClick={function (){
                    fetch(`https://g.tenor.com/v1/search?q=${input}&key=${API_KEY_TENOR}&limit=12`)
                    // fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${input}`)
                        .then(el => {
                            // console.log(el);
                            return el.json()
                        })
                        .then((res) =>{
                            const gif = [];
                            console.log(res)
                            res.results.forEach((result)=>{
                                result.media.forEach((media)=>{
                                    gif.push(media[format].url)
                                })   
                            })
                            setGiphy(gif); 
                        })
                }}
            >Search GIF</button>
            <Box className='button' sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Format</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={format}
                        label="Format"
                        onChange={event => {
                            setFormat(event.target.value)
                        }
                    }
                    >
                        <MenuItem value={'tinygif'}>GIF</MenuItem>
                        <MenuItem value={'webm'}>WEBM</MenuItem>
                        <MenuItem value={'mp4'}>MP4</MenuItem>
                    </Select>
                </FormControl>
                </Box>
            <section className='items'>
                <ImageList className='gif' cols={3} rowHeight={164}>
                    {giphy.map((gif, index) => (
                        <ImageListItem key={index}>
                        <img
                            src={gif}
                            loading="lazy"
                            className='gifIMG'
                        />
                        </ImageListItem>
                    ))}
                </ImageList>   
                <section
                    className='search'
                >
                    {explanations.map((explanation, index) =>{
                        return (
                            <p  className='paragraph' key={index}>{index+1 + ". "}{explanation}</p>
                        )
                    })}
                    {/* <label for="cars">Choose a car:</label>
                        <select name="cars" id="cars">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select> */}
                </section>
            </section>
        </div>
    )
}

export default InputBox;


//pagina cu cuvinte + dictionar + lettercount + gif

//pun gif-urile in paragraf. fiecare paragraf un gif cu img si src
//state pentru paragraf
//de scos butonul de search gif si legat ambele la searchul de dictionar
//de facut dropdown cu alegeri daca vrei sa returneze poze, gif, definitii sau video

//de ce nu se modifica rowHeight pe ultimul rand
//de ce nu reusesc sa fac egale cele 2 cutii? 
//de ce nu searchul are spatiu liber si gif nu are, tinand cont ca sunt la fel. 

//software design patterns 
//path params si query/request params

