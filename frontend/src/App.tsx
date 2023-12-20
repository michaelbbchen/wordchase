import React from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Home';
import Room from './Room';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
        <Router>
          <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/room' element = {<Room/>}>
              <Route path=":roomId" element={<Room />} />
            </Route>
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
