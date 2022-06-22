import logo from './logo.svg';
import './App.css';
import NewPage from './pages/NewPage'
import CountLetters from './pages/CountLetters';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import ToDoList from './pages/ToDoList';
import HomePage from './pages/HomePage';
import TicTacToe from './pages/TicTacToe'

function App() {
  
  return (
    <div 
      className="App"
    >
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/countletters" element={<CountLetters />}/> 
          <Route path="/newpage" element ={<NewPage />}/>
          <Route path="/todolist" element ={<ToDoList />}/>
          <Route path="/homepage" element ={<HomePage />}/>
          <Route path="/tictactoe" element = {<TicTacToe />}/>
          <Route path="/" element={<div>Unknown</div>}/>
        </Routes>
    </div>
  );
}

export default App; 
